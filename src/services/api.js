import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000 * 30,
  withCredentials: true,
});

const authorize = localStorage.getItem("user");
const headers = {
  Authorization: authorize,
};
export const login = (credentials) => api.post("/login", credentials);
export const changePassword = (passwordData) =>
  api.put("/change-password", passwordData);
export const logout = () => api.delete("/logout");
export const getCart = () => api.get("/user/cart", { headers });
export const addToCart = (params) =>
  api.post("/user/cart", params, { headers });
export const deleteFromCart = (bookId) => api.delete(`/user/cart/${bookId}`);
export const getBooks = (params) => api.get("/books", { params });
export const getBookDetail = (bookId) => api.get(`/books/${bookId}`);
export const getBookRate = (bookId) => api.get(`/books/rate/${bookId}`);

export default api;
