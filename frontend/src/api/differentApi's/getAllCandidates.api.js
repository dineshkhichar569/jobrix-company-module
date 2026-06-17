import API from "../axios.js";

export const getAllCandidates = () => {
    return API.get("/fetch/allCandidate");
}