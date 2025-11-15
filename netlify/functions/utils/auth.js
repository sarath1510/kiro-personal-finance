const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} True if passwords match
 */
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

/**
 * Generate a JWT access token
 * @param {object} payload - Token payload (userId, role)
 * @param {string} type - Token type ('access' or 'refresh')
 * @returns {string} JWT token
 */
function generateToken(payload, type = 'access') {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  const expiry = type === 'refresh' ? REFRESH_TOKEN_EXPIRY : ACCESS_TOKEN_EXPIRY;
  
  return jwt.sign(
    {
      userId: payload.userId,
      role: payload.role,
      type: type
    },
    secret,
    { expiresIn: expiry }
  );
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw error;
  }
}

/**
 * Extract and verify token from Netlify event headers
 * @param {object} event - Netlify function event object
 * @returns {object} Decoded token payload with userId and role
 * @throws {Error} If token is missing or invalid
 */
function extractUserFromEvent(event) {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  
  if (!authHeader) {
    throw new Error('No authorization header provided');
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw new Error('Invalid authorization header format');
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);

  // Verify it's an access token
  if (decoded.type !== 'access') {
    throw new Error('Invalid token type');
  }

  return {
    userId: decoded.userId,
    role: decoded.role
  };
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  extractUserFromEvent
};
