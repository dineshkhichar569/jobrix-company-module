import API from "../axios";

export const updateCandidateStatus = async (id, status) => {
  const res = await API.patch(`/candidates/${id}/status`, { status });
  return res.data;
};