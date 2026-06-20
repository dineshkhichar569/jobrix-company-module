import Candidate from "../../models/AddCandidate.model.js";

export const updateCandidateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Status updated successfully.",
      data: candidate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
