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
 * Netlify Function: Get User Profile
 * GET /api/profile
 * 
 * Returns authenticated user's profile information
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

  try {
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

    // Query user profile from database
    const supabase = getSupabase();
    const { data: profile, error } = await supabase
      .from('users')
      .select('id, username, email, role, created_at')
      .eq('id', user.userId)
      .single();

    if (error || !profile) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: {
            message: 'User not found',
            code: 'USER_NOT_FOUND'
          }
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(profile)
    };

  } catch (error) {
    console.error('Profile error:', error);

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
