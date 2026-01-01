import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const companySignup = (data) => {
  return API.post("/auth/company/signup", data);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};
