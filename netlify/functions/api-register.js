const { getSupabase } = require('./utils/db');
const { hashPassword } = require('./utils/auth');
const { validateUser } = require('./utils/validation');

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
 * Netlify Function: User Registration
 * POST /api/register
 * 
 * Creates a new user account with hashed password
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
    const data = JSON.parse(event.body);

    // Validate input
    const validation = validateUser(data);
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

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Insert user into database
    const supabase = getSupabase();
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          username: data.username.trim(),
          email: data.email.trim().toLowerCase(),
          password_hash: passwordHash,
          role: data.role
        }
      ])
      .select('id, username, email, role, created_at')
      .single();

    if (error) {
      console.error('Database error:', error);

      // Handle duplicate username or email
      if (error.code === '23505') {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({
            error: {
              message: 'Username or email already exists',
              code: 'DUPLICATE_USER'
            }
          })
        };
      }

      throw error;
    }

    // Create default categories for new user
    const defaultCategories = [
      'Salary',
      'Groceries',
      'Entertainment',
      'Utilities',
      'Transportation',
      'Dining Out',
      'Healthcare',
      'Shopping',
      'Rent',
      'Other'
    ];

    const categoryInserts = defaultCategories.map(name => ({
      user_id: user.id,
      name: name
    }));

    const { error: categoryError } = await supabase
      .from('categories')
      .insert(categoryInserts);

    if (categoryError) {
      console.error('Failed to create default categories:', categoryError);
      // Don't fail registration if categories fail, just log it
    }

    // Return created user (without password hash)
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(user)
    };

  } catch (error) {
    console.error('Registration error:', error);

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
