import API from "../axios";

export const addJob = (data) => {
  return API.post("/jobs", data);
};
