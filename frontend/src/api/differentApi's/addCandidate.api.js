import API from "../axios";

export const addCandidate = (data) => {
  return API.post("/employee/addCandidate", data);
};