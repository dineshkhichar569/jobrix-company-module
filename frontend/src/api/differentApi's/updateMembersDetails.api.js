import API from "../axios.js";

export const updateMembersDetails = async (id, data) => {
  const res = await API.patch(`admin/members/${id}`, data);
  return res.data;
};
