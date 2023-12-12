import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

//proxy: "http://localhost:8080", path:"/api/v1/users-api/",
const api = axios.create({
  baseURL: "https://oncloud-back.k-paas.org",
  headers: {
    "Content-type": "application/json",
    Authorization: `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
  },
});

// const refreshAccessToken = async () => {
//   const response = await api.get(`/api/v1/auth/refresh`);
//   ACCESS_TOKEN = response.data;
//   localStorage.setItem("accessToken", ACCESS_TOKEN);
//   api.defaults.headers.common[
//     "Authorization"
//   ] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
// // };

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 403 && !originalRequest._retry) {
//       await refreshAccessToken();
//       return api(originalRequest);
//     }
//     return Promise.reject(error);
//   }
//);

export default api;
