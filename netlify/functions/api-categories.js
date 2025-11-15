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
 * Netlify Function: Get Categories
 * GET /api/categories - List user's categories
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

    // Get all categories for the user
    const { data: categories, error } = await supabase
      .from('categories')
      .select('id, name')
      .eq('user_id', user.userId)
      .order('name');

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        categories: categories || []
      })
    };

  } catch (error) {
    console.error('Get categories error:', error);

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
