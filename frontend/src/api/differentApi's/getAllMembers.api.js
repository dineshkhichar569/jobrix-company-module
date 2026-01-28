import API from "../axios.js";

export const getAllMembers = () => {
  return API.get("/admin/members");
};
