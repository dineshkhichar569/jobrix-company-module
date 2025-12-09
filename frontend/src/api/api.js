import axios from "axios";

const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: { "content-type": "application/json" },
});

////// to request Intercepter to attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // show errors in console
    console.error(
      "API response error",
      err?.response?.status,
      err?.response?.data
    );
    return Promise.reject(err);
  }
);

export default api;
