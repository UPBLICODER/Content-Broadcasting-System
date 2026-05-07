import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth");

      if (stored) {
        const { token } = JSON.parse(stored);

        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";

    console.error("API Error:", message);

    // handle unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("auth");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(message);
  },
);

export default api;
