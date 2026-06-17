import Candidate from "../../models/AddCandidate.model.js";

export const getAllCandidates = async (req, res) => {
  try {
    const fetchCandidates = await Candidate.find({
      companyId: req.companyId,
    });

    res.status(200).json(fetchCandidates);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
