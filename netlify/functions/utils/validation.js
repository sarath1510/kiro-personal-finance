/**
 * Validation utilities for input data
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate date format (YYYY-MM-DD)
 * @param {string} date - Date string to validate
 * @returns {boolean} True if valid date format
 */
function isValidDate(date) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return false;
  }
  
  // Check if it's a valid date
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj);
}

/**
 * Validate UUID format
 * @param {string} uuid - UUID string to validate
 * @returns {boolean} True if valid UUID format
 */
function isValidUUID(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validate user registration data
 * @param {object} data - User data to validate
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validateUser(data) {
  const errors = [];

  if (!data.username || typeof data.username !== 'string' || data.username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (data.username && data.username.length > 50) {
    errors.push('Username must not exceed 50 characters');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email address is required');
  }

  if (!data.password || typeof data.password !== 'string' || data.password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!data.role || !['user', 'hardcoder'].includes(data.role)) {
    errors.push('Role must be either "user" or "hardcoder"');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate transaction data
 * @param {object} data - Transaction data to validate
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validateTransaction(data) {
  const errors = [];

  if (data.amount === undefined || data.amount === null) {
    errors.push('Amount is required');
  } else if (isNaN(parseFloat(data.amount))) {
    errors.push('Amount must be a valid number');
  } else if (parseFloat(data.amount) <= 0) {
    errors.push('Amount must be greater than 0');
  }

  if (!data.date) {
    errors.push('Date is required');
  } else if (!isValidDate(data.date)) {
    errors.push('Date must be in YYYY-MM-DD format');
  }

  if (!data.category_id) {
    errors.push('Category ID is required');
  } else if (!isValidUUID(data.category_id)) {
    errors.push('Category ID must be a valid UUID');
  }

  if (data.is_expense === undefined || data.is_expense === null) {
    errors.push('is_expense field is required');
  } else if (typeof data.is_expense !== 'boolean') {
    errors.push('is_expense must be a boolean value');
  }

  if (data.description && typeof data.description !== 'string') {
    errors.push('Description must be a string');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate budget data
 * @param {object} data - Budget data to validate
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validateBudget(data) {
  const errors = [];

  if (!data.category_id) {
    errors.push('Category ID is required');
  } else if (!isValidUUID(data.category_id)) {
    errors.push('Category ID must be a valid UUID');
  }

  if (data.amount === undefined || data.amount === null) {
    errors.push('Amount is required');
  } else if (isNaN(parseFloat(data.amount))) {
    errors.push('Amount must be a valid number');
  } else if (parseFloat(data.amount) <= 0) {
    errors.push('Amount must be greater than 0');
  }

  if (!data.period) {
    errors.push('Period is required');
  } else if (!['weekly', 'monthly', 'yearly'].includes(data.period)) {
    errors.push('Period must be one of: weekly, monthly, yearly');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize string input to prevent injection attacks
 * @param {string} input - String to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeString(input) {
  if (typeof input !== 'string') {
    return input;
  }
  
  // Remove any potential SQL injection characters
  return input.trim().replace(/[;<>]/g, '');
}

module.exports = {
  isValidEmail,
  isValidDate,
  isValidUUID,
  validateUser,
  validateTransaction,
  validateBudget,
  sanitizeString
};
