const { verifyToken, generateToken } = require('./utils/auth');

/**
 * CORS headers for API responses
 */
const headers = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
    ? process.env.VITE_API_BASE_URL || '*'
    : 'http://localhost:5173',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

/**
 * Netlify Function: Token Refresh
 * POST /api/refresh
 * 
 * Generates a new access token from a valid refresh token
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

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
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
    // Parse request body
    const { refreshToken } = JSON.parse(event.body);

    if (!refreshToken) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: {
            message: 'Refresh token is required',
            code: 'MISSING_TOKEN'
          }
        })
      };
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = verifyToken(refreshToken);
    } catch (error) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: {
            message: error.message || 'Invalid or expired refresh token',
            code: 'INVALID_TOKEN'
          }
        })
      };
    }

    // Verify it's a refresh token
    if (decoded.type !== 'refresh') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: {
            message: 'Invalid token type',
            code: 'INVALID_TOKEN_TYPE'
          }
        })
      };
    }

    // Generate new access token
    const tokenPayload = {
      userId: decoded.userId,
      role: decoded.role
    };

    const accessToken = generateToken(tokenPayload, 'access');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        accessToken
      })
    };

  } catch (error) {
    console.error('Token refresh error:', error);

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
