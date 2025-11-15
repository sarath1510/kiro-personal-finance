const { getSupabase } = require('./utils/db');
const { extractUserFromEvent } = require('./utils/auth');

/**
 * CORS headers for API responses
 */
const headers = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? process.env.VITE_API_BASE_URL || '*'
    : 'http://localhost:5173',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json'
};

/**
 * Netlify Function: Spending by Category Report
 * GET /api/reports/spending-by-category
 * 
 * Returns aggregated spending by category for a date range
 */
exports.handler = async (event) => {
  // Handle OPTIONS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: {
          message: 'Method not allowed',
          code: 'METHOD_NOT_ALLOWED'
        }
      })
    };
  }

  // Extract and verify user from JWT token
  let user;
  try {
    user = extractUserFromEvent(event);
  } catch (error) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({
        error: {
          message: error.message || 'Unauthorized',
          code: 'UNAUTHORIZED'
        }
      })
    };
  }

  try {
    const supabase = getSupabase();

    // Parse query parameters
    const params = new URLSearchParams(event.queryStringParameters || {});
    let startDate = params.get('start');
    let endDate = params.get('end');

    // Default to current month if no dates provided
    if (!startDate || !endDate) {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split('T')[0];
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split('T')[0];
    }

    // Query transactions with category information
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select(`
        amount,
        category_id,
        categories (
          name
        )
      `)
      .eq('user_id', user.userId)
      .eq('is_expense', true)
      .gte('date', startDate)
      .lte('date', endDate);

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    // Aggregate spending by category
    const categoryTotals = {};
    
    transactions.forEach(transaction => {
      const categoryName = transaction.categories?.name || 'Uncategorized';
      const amount = parseFloat(transaction.amount);
      
      if (categoryTotals[categoryName]) {
        categoryTotals[categoryName] += amount;
      } else {
        categoryTotals[categoryName] = amount;
      }
    });

    // Convert to array format for charts
    const data = Object.entries(categoryTotals).map(([category_name, total]) => ({
      category_name,
      total: parseFloat(total.toFixed(2))
    }));

    // Sort by total descending
    data.sort((a, b) => b.total - a.total);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        data,
        period: {
          start: startDate,
          end: endDate
        }
      })
    };

  } catch (error) {
    console.error('Spending report error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: {
          message: 'Internal server error',
          code: 'SERVER_ERROR'
        }
      })
    };
  }
};
