import axios from "axios";

// Base axios instance — backend se connect karta hai
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ── User API calls ──────────────────────────────────
export const getUsers = () => api.get("/users");
export const createUser = (data) => api.post("/users", data);
export const getUserById = (id) => api.get(`/users/${id}`);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
