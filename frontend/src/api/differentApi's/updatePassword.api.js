import API from "../axios.js";

export const updatePassword = async (currentPassword, newPassword) => {
  const res = await API.patch("admin/members/change-password", {
    currentPassword,
    newPassword,
  });
  return res.data;
};