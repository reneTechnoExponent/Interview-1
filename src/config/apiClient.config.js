const axios = require("axios");

/**
 * Configure Axios instance for external API communication
 */
const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// You can add interceptors here for logging or auth if needed
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors or transform them before they hit the services
    return Promise.reject(error);
  },
);

module.exports = apiClient;
