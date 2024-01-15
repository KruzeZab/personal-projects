import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:8000',
});

let tokens: { accessToken?: string } | null = null;
let tokensRetrieved = false;

const retrieveTokens = () => {
  if (!tokensRetrieved) {
    const tokensString = localStorage.getItem('authTokens');
    if (tokensString) {
      tokens = JSON.parse(tokensString);
    }
    tokensRetrieved = true;
  }
};

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
