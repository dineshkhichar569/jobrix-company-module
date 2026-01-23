import API from "../axios.js";

export const addMember = (data) => {
  return API.post("/admin/registerRecruiter", data);
};
