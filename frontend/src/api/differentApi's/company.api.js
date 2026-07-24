import API from "../axios.js";

export const getCompanyDetails = async (data) => {
  const res = await API.get("/admin/company", data);
  return res.data;
};
export const UpdateCompanyDetails = async (data) => {
  const res = await API.patch("/admin/company", data);
  return res.data;
};
