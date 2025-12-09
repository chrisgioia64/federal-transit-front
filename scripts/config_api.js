/**
 * API Configuration
 * 
 * Set USE_REMOTE to true to use the remote API, false for local development
 */
const USE_REMOTE = false;

// API URL configuration
const API_URL = USE_REMOTE 
    ? 'https://z43i39stug.us-east-1.awsapprunner.com/'  // Remote API (if deployed)
    : 'http://localhost:5000';           // Local Spring Boot backend

console.log('API URL configured:', API_URL);


