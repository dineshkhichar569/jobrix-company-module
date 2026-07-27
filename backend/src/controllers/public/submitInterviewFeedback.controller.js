import Interview from "../../models/Interview.model.js";
import Candidate from "../../models/AddCandidate.model.js";

//! Called when the recruiter fills the feedback form while moving an
//! "Interview Scheduled" candidate to the next stage.
//! Saves feedback, marks the interview Completed, and advances the candidate.

export const submitInterviewFeedback = async (req, res) => {
  try {
    const { id } = req.params; //! interview id
    const { feedback, recommendation, newStatus } = req.body;

    if (!feedback) {
      return res.status(400).json({
        success: false,
        message: "Feedback is required.",
      });
    }

    //! update the interview: feedback + recommendation + mark completed
    const interview = await Interview.findByIdAndUpdate(
      id,
      {
        feedback,
        recommendation: recommendation || "Pending",
        status: "Completed",
      },
      { new: true },
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found.",
      });
    }

    //! advance the candidate to the stage the recruiter picked
    if (newStatus) {
      await Candidate.findByIdAndUpdate(interview.candidate, {
        status: newStatus,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Feedback saved and candidate moved.",
      data: interview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};