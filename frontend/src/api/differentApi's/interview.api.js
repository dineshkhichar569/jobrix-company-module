//! to create an Inteview
import API from "../axios.js";
export const createInterview = async (data) => {
  const res = await API.post("interviews", data);
  return res.data;
};

//! to submit interview Form
export const submitInterviewFeedback = async (id, data) => {
  const res = await API.patch(`interviews/${id}/feedback`, data);
  return res.data;
};

//! to get all Interviews
export const getAllInterviews = async () => {
  const res = await API.get("interviews");
  return res.data;
};