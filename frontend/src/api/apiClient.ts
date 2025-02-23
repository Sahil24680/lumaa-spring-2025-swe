import axios from 'axios';

// Create an Axios instance to make API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Base URL for all API requests
});

/**
 * Request Interceptor
 * - Adds the Authorization header with the token if it exists
 */
apiClient.interceptors.request.use((config) => {
  // Get the token from local storage
  const token = localStorage.getItem('accessToken');
  // If there's a token, add it to the headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Response Interceptor
 * - Catches any errors from the API
 * - Logs the error and passes it back to be handled in the component
 */
apiClient.interceptors.response.use(
  (response) => response,  // If the request is successful, just return the response
  (error) => {
    console.error('API Error:', error);  // Log the error for debugging
    return Promise.reject(error);  // Pass the error to be handled in the component
  }
);

export default apiClient;
