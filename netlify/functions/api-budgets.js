const { getSupabase } = require('./utils/db');
const { extractUserFromEvent } = require('./utils/auth');
const { validateBudget } = require('./utils/validation');

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
 * Netlify Function: Budgets
 * GET /api/budgets - List user's budgets with spending information
 * POST /api/budgets - Create a new budget
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
    return handleGetBudgets(user);
  } else if (event.httpMethod === 'POST') {
    return handleCreateBudget(user, event);
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
 * Handle GET request - List budgets with spending information
 */
async function handleGetBudgets(user) {
  try {
    const supabase = getSupabase();

    // Get all budgets for the user
    const { data: budgets, error: budgetsError } = await supabase
      .from('budgets')
      .select(`
        id,
        category_id,
        amount,
        period,
        created_at,
        categories (
          name
        )
      `)
      .eq('user_id', user.userId)
      .order('created_at', { ascending: false });

    if (budgetsError) {
      console.error('Database error:', budgetsError);
      throw budgetsError;
    }

    // Calculate spent amount for each budget
    const budgetsWithSpending = await Promise.all(
      budgets.map(async (budget) => {
        // Calculate date range based on period
        const now = new Date();
        let startDate;

        switch (budget.period) {
          case 'weekly':
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
            break;
          case 'monthly':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
          case 'yearly':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
          default:
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }

        // Get total spent in this category for the period
        const { data: transactions, error: transError } = await supabase
          .from('transactions')
          .select('amount')
          .eq('user_id', user.userId)
          .eq('category_id', budget.category_id)
          .eq('is_expense', true)
          .gte('date', startDate.toISOString().split('T')[0]);

        if (transError) {
          console.error('Transaction query error:', transError);
        }

        const spent = transactions
          ? transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0)
          : 0;

        return {
          id: budget.id,
          category_id: budget.category_id,
          category_name: budget.categories?.name || 'Unknown',
          amount: parseFloat(budget.amount),
          period: budget.period,
          spent: spent,
          created_at: budget.created_at
        };
      })
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        budgets: budgetsWithSpending
      })
    };

  } catch (error) {
    console.error('Get budgets error:', error);

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
 * Handle POST request - Create budget
 */
async function handleCreateBudget(user, event) {
  try {
    // Parse request body
    const data = JSON.parse(event.body);

    // Validate input
    const validation = validateBudget(data);
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

    const supabase = getSupabase();

    // Verify category belongs to user
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

    // Insert budget
    const { data: budget, error } = await supabase
      .from('budgets')
      .insert([
        {
          user_id: user.userId,
          category_id: data.category_id,
          amount: parseFloat(data.amount),
          period: data.period
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);

      // Handle duplicate budget (same user, category, period)
      if (error.code === '23505') {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({
            error: {
              message: 'Budget already exists for this category and period',
              code: 'DUPLICATE_BUDGET'
            }
          })
        };
      }

      throw error;
    }

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        id: budget.id,
        user_id: budget.user_id,
        category_id: budget.category_id,
        amount: parseFloat(budget.amount),
        period: budget.period,
        created_at: budget.created_at
      })
    };

  } catch (error) {
    console.error('Create budget error:', error);

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
