import API from "../axios.js";

export const deactivateMember = async (id) => {
  const res = await API.patch(`admin/members/${id}/deactivate`);
  return res.data;
};

export const activateMember = async (id) => {
  const res = await API.patch(`admin/members/${id}/activate`);
  return res.data;
};
