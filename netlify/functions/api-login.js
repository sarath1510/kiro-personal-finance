const { getSupabase } = require('./utils/db');
const { comparePassword, generateToken } = require('./utils/auth');

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
 * Netlify Function: User Login
 * POST /api/login
 * 
 * Authenticates user and returns JWT tokens
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
    const { username, password } = JSON.parse(event.body);

    // Validate input
    if (!username || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: {
            message: 'Username and password are required',
            code: 'MISSING_CREDENTIALS'
          }
        })
      };
    }

    // Query user from database
    const supabase = getSupabase();
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, email, password_hash, role')
      .eq('username', username.trim())
      .single();

    if (error || !user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: {
            message: 'Invalid username or password',
            code: 'INVALID_CREDENTIALS'
          }
        })
      };
    }

    // Compare password with hash
    const isValidPassword = await comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: {
            message: 'Invalid username or password',
            code: 'INVALID_CREDENTIALS'
          }
        })
      };
    }

    // Generate tokens
    const tokenPayload = {
      userId: user.id,
      role: user.role
    };

    const accessToken = generateToken(tokenPayload, 'access');
    const refreshToken = generateToken(tokenPayload, 'refresh');

    // Return tokens and user info (without password hash)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      })
    };

  } catch (error) {
    console.error('Login error:', error);

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
