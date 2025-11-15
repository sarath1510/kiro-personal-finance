import api from './api';

/**
 * Authentication service
 */
const authService = {
  /**
   * Register a new user
   * @param {object} userData - { username, email, password, role }
   * @returns {Promise} User data
   */
  async register(userData) {
    const response = await api.post('/api/register', userData);
    return response.data;
  },

  /**
   * Login user
   * @param {string} username
   * @param {string} password
   * @returns {Promise} { accessToken, refreshToken, user }
   */
  async login(username, password) {
    const response = await api.post('/api/login', { username, password });
    const { accessToken, refreshToken, user } = response.data;
    
    // Store tokens
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  /**
   * Get current user from localStorage
   * @returns {object|null} User object or null
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Get user profile from API
   * @returns {Promise} User profile
   */
  async getProfile() {
    const response = await api.get('/api/profile');
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  /**
   * Refresh access token
   * @returns {Promise} New access token
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post('/api/refresh', { refreshToken });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  }
};

export default authService;
