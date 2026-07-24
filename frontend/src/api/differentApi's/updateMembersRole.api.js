import API from "../axios.js";

export const updateMembersRole = async (id, role) => {
  const res = await API.patch(`admin/members/${id}/role`, { role });
  return res.data;
};
