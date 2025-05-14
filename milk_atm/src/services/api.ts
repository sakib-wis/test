import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api/", // change to your API root
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login API
export const loginUser = async (phone_number: string, password: string) => {
  const response = await api.post("account/login", { phone_number, password });
  return response.data;
};

// Add more APIs here:
export const fetchUserData = async () => {
  const response = await api.get("/account/user"); // example
  return response.data;
};

// You can export the axios instance too if needed
export default api;
