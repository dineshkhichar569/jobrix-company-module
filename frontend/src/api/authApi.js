import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const companySignup = (data) => {
  API.post("/auth/company/signup", data);
};

export const loginUser = (data) => {
  API.post("/auth/login", data);
};
