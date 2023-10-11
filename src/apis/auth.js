import api from "./index.js";

export const idCheck = (data) =>
  api.post("/api/v1/users-api/id-dup-check", data);

export const emailCheck = (data) =>
  api.post("/api/v1/users-api/mailConfirm", data);

export const codeCheck = (data) => api.post("/api/v1/users-api/authCode", data);

export const join = (data) => api.post("/api/v1/users-api/sign-up", data);

export const login = (data) => api.post("/api/v1/users-api/sign-in", data);

export const loginTest = (token) =>
  api.get("/api/v1/test-api/login-test", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
