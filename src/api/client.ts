import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.log(`[API Request Error] ${error}`);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      // server responded with error status
      console.error("[API Error]", error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("[Network Error] No response received");
    } else {
      // Something went wrong
      console.error("[Error]", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
