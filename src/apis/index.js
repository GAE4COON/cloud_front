import axios from "axios";

//proxy: "http://localhost:8080", path:"/api/v1/users-api/",
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
