import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
// Base Axios instance
const api = axios.create({
  baseURL: apiUrl, // change to your API root
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token != undefined && token != "undefined" && config.headers) {
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
export const fetchDashboard = async () => {
  const response = await api.get("/dairy/dashboard/"); // example
  return response.data;
};
export const fetchUserData = async () => {
  const response = await api.get("/account/user/"); // example
  return response.data;
};
// Add more APIs here:
export const fetchAdminPanel = async () => {
  const response = await api.get("/admin-panel/"); // example
  return response.data;
};
// Add more APIs here:
export const fetchCustomers = async () => {
  const response = await api.get("/dairy/customers/"); // example
  return response.data;
};
export const fetchCustomer = async (enc_id: any) => {
  const response = await api.get("/dairy/customers/" + enc_id); // example
  return response.data;
};
export const fetchSale = async (enc_id: any) => {
  const response = await api.get("/dairy/milk-sales/" + enc_id); // example
  return response.data;
};
export const createCustomers = async (payload: any) => {
  const response = await api.post("/dairy/add_customer/", payload); // example
  return response.data;
};
export const editCustomers = async (enc_id: string, payload: any) => {
  const response = await api.patch(
    "/dairy/customers/" + enc_id + "/",
    payload
  ); // example
  return response.data;
};
export const deleteCustomers = async (enc_id: string) => {
  const response = await api.delete(
    "/dairy/customers/" + enc_id + "/"
  ); // example
  return response.data;
};
export const deleteSales = async (enc_id: string) => {
  const response = await api.delete(
    "/dairy/customers/" + enc_id + "/"
  ); // example
  return response.data;
};
export const fetchStates = async () => {
  const response = await api.get("/dairy/states/"); // example
  return response.data;
};
export const fetchCities = async () => {
  const response = await api.post("/dairy/cities/"); // example
  return response.data;
};
export const fetchSales = async (payload: any) => {
  const response = await api.post("/dairy/get-milk-sales/", payload); // example
  return response.data;
};
export const milkSold = async (payload: any) => {
  const response = await api.post("/dairy/milk-sales/", payload); // example
  return response.data;
};
export const editSale = async (enc_id: string, payload: any) => {
  const response = await api.patch("/dairy/milk-sales/" + enc_id + "/", payload); // example
  return response.data;
};

// You can export the axios instance too if needed
export default api;
