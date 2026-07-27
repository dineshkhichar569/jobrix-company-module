import Interview from "../../models/Interview.model.js";
import Candidate from "../../models/AddCandidate.model.js";

export const createInterview = async (req, res) => {
  try {
    const { candidate, job, interviewer, scheduledAt, mode, round } = req.body;

    //! basic validation
    if (!candidate || !interviewer || !scheduledAt) {
      return res.status(400).json({
        success: false,
        message: "Candidate, interviewer and date are required.",
      });
    }

    //! create the interview
    const interview = await Interview.create({
      companyId: req.companyId,
      candidate,
      job,
      interviewer,
      scheduledAt,
      mode,
      round,
      createdBy: req.userId,
    });

    //! auto-sync: move the candidate to "Interview Scheduled"
    await Candidate.findByIdAndUpdate(candidate, {
      status: "Interview Scheduled",
    });

    return res.status(201).json({
      success: true,
      message: "Interview scheduled successfully.",
      data: interview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
