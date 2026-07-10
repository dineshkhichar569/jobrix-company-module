import API from "../axios";

export const updateJob = async (id, data) => {
  const res = await API.patch(`/jobs/${id}`, data);
  return res.data;
}; 