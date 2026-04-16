import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8081" });

// USER
export const registerUser  = (data) => API.post("/users/register", data);
export const loginUser     = (data) => API.post("/users/login", data);

// PRODUCT
export const getProducts   = ()     => API.get("/products");
export const addProduct    = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id)   => API.delete(`/products/${id}`);

// ORDER
export const placeOrder    = (data) => API.post("/orders", data);
export const getOrders     = ()     => API.get("/orders");
