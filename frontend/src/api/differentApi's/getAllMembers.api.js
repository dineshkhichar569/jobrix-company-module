import API from "../axios";

export const getAllMembers = () => {
  return API.get("/admin/members");
};
