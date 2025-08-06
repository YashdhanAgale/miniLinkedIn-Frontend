import axios from "axios";

const api = axios.create({
  baseURL: "https://minilinkedin-backend-i5mm.onrender.com/api",
  withCredentials: true,
});

export default api;
