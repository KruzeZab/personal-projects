import axios from 'axios';

/**
 * Instantiate axios
 *
 */
const server = axios.create({
  baseURL: 'http://localhost:8000',
});

let tokens: { accessToken?: string } | null = null;

/**
 * Retrieve tokens
 *
 */
const retrieveTokens = () => {
  const tokensString = localStorage.getItem('authTokens');
  if (tokensString) {
    tokens = JSON.parse(tokensString);
  }
};

/**
 * Inteceptor to check authentication from access token
 */
server.interceptors.request.use(
  (config) => {
    retrieveTokens();

    // Check if tokens are available
    if (tokens && tokens.accessToken) {
      // Attach the access token to the request header
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default server;
