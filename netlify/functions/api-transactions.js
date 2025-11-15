const { getSupabase } = require('./utils/db');
const { extractUserFromEvent } = require('./utils/auth');
const { validateTransaction } = require('./utils/validation');

/**
 * CORS headers for API responses
 */
const headers = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? process.env.VITE_API_BASE_URL || '*'
    : 'http://localhost:5173',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

/**
 * Netlify Function: Transactions
 * GET /api/transactions - List user's transactions with optional date filtering
 * POST /api/transactions - Create a new transaction
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

  // Route based on HTTP method
  if (event.httpMethod === 'GET') {
    return handleGetTransactions(user, event);
  } else if (event.httpMethod === 'POST') {
    return handleCreateTransaction(user, event);
  } else {
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
};

/**
 * Handle GET request - List transactions
 */
async function handleGetTransactions(user, event) {
  try {
    const supabase = getSupabase();

    // Build query
    let query = supabase
      .from('transactions')
      .select(`
        id,
        amount,
        date,
        description,
        is_expense,
        category_id,
        categories (
          name
        ),
        created_at
      `)
      .eq('user_id', user.userId)
      .order('date', { ascending: false });

    // Apply date filters if provided
    const params = new URLSearchParams(event.queryStringParameters || {});
    const startDate = params.get('start');
    const endDate = params.get('end');

    if (startDate) {
      query = query.gte('date', startDate);
    }

    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data: transactions, error } = await query;

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    // Format response
    const formattedTransactions = transactions.map(t => ({
      id: t.id,
      amount: parseFloat(t.amount),
      date: t.date,
      category_id: t.category_id,
      category_name: t.categories?.name || 'Unknown',
      description: t.description,
      is_expense: t.is_expense,
      created_at: t.created_at
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        transactions: formattedTransactions,
        total: formattedTransactions.length
      })
    };

  } catch (error) {
    console.error('Get transactions error:', error);

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
}

/**
 * Handle POST request - Create transaction
 */
async function handleCreateTransaction(user, event) {
  try {
    // Parse request body
    const data = JSON.parse(event.body);

    // Validate input
    const validation = validateTransaction(data);
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: {
            message: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: validation.errors
          }
        })
      };
    }

    // Verify category belongs to user
    const supabase = getSupabase();
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('id', data.category_id)
      .eq('user_id', user.userId)
      .single();

    if (categoryError || !category) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: {
            message: 'Invalid category or category does not belong to user',
            code: 'INVALID_CATEGORY'
          }
        })
      };
    }

    // Insert transaction
    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: user.userId,
          category_id: data.category_id,
          amount: parseFloat(data.amount),
          date: data.date,
          description: data.description || null,
          is_expense: data.is_expense
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        id: transaction.id,
        user_id: transaction.user_id,
        category_id: transaction.category_id,
        amount: parseFloat(transaction.amount),
        date: transaction.date,
        description: transaction.description,
        is_expense: transaction.is_expense,
        created_at: transaction.created_at
      })
    };

  } catch (error) {
    console.error('Create transaction error:', error);

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
}
