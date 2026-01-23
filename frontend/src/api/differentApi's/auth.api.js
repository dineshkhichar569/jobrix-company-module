import API from "../axios.js";

export const companySignup = (data) => {
  return API.post("/auth/company/signup", data);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};