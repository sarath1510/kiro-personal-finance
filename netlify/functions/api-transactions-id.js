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
  'Access-Control-Allow-Methods': 'PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

/**
 * Netlify Function: Transaction by ID
 * PUT /api/transactions/:id - Update a transaction
 * DELETE /api/transactions/:id - Delete a transaction
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

  // Extract transaction ID from path
  const pathParts = event.path.split('/');
  const transactionId = pathParts[pathParts.length - 1];

  if (!transactionId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: {
          message: 'Transaction ID is required',
          code: 'MISSING_ID'
        }
      })
    };
  }

  // Route based on HTTP method
  if (event.httpMethod === 'PUT') {
    return handleUpdateTransaction(user, transactionId, event);
  } else if (event.httpMethod === 'DELETE') {
    return handleDeleteTransaction(user, transactionId);
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
 * Handle PUT request - Update transaction
 */
async function handleUpdateTransaction(user, transactionId, event) {
  try {
    const supabase = getSupabase();

    // Verify transaction exists and belongs to user
    const { data: existing, error: fetchError } = await supabase
      .from('transactions')
      .select('id, user_id')
      .eq('id', transactionId)
      .single();

    if (fetchError || !existing) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: {
            message: 'Transaction not found',
            code: 'NOT_FOUND'
          }
        })
      };
    }

    if (existing.user_id !== user.userId) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: {
            message: 'You do not have permission to update this transaction',
            code: 'FORBIDDEN'
          }
        })
      };
    }

    // Parse and validate request body
    const data = JSON.parse(event.body);
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

    // Update transaction
    const { data: updated, error: updateError } = await supabase
      .from('transactions')
      .update({
        category_id: data.category_id,
        amount: parseFloat(data.amount),
        date: data.date,
        description: data.description || null,
        is_expense: data.is_expense
      })
      .eq('id', transactionId)
      .select()
      .single();

    if (updateError) {
      console.error('Database error:', updateError);
      throw updateError;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        id: updated.id,
        category_id: updated.category_id,
        amount: parseFloat(updated.amount),
        date: updated.date,
        description: updated.description,
        is_expense: updated.is_expense,
        updated_at: updated.updated_at
      })
    };

  } catch (error) {
    console.error('Update transaction error:', error);

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
 * Handle DELETE request - Delete transaction
 */
async function handleDeleteTransaction(user, transactionId) {
  try {
    const supabase = getSupabase();

    // Verify transaction exists and belongs to user
    const { data: existing, error: fetchError } = await supabase
      .from('transactions')
      .select('id, user_id')
      .eq('id', transactionId)
      .single();

    if (fetchError || !existing) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: {
            message: 'Transaction not found',
            code: 'NOT_FOUND'
          }
        })
      };
    }

    if (existing.user_id !== user.userId) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          error: {
            message: 'You do not have permission to delete this transaction',
            code: 'FORBIDDEN'
          }
        })
      };
    }

    // Delete transaction
    const { error: deleteError } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId);

    if (deleteError) {
      console.error('Database error:', deleteError);
      throw deleteError;
    }

    return {
      statusCode: 204,
      headers,
      body: ''
    };

  } catch (error) {
    console.error('Delete transaction error:', error);

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
