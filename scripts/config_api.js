/**
 * API Configuration
 * 
 * Uses Vite environment variables for API URL configuration
 * - VITE_API_URL from .env or .env.local
 * - .env.local takes precedence over .env
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('API URL configured:', API_URL);

// Export API_URL for use in other modules
export { API_URL };


