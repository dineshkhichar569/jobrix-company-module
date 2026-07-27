import Candidate from "../../models/AddCandidate.model.js";
import Interview from "../../models/Interview.model.js";

export const getAllInterviews = async (req, res) => {
  try {
    //! company scope + role scope
    const filter = { companyId: req.companyId };
    if (req.role !== "admin") {
      filter.addedBy = req.userId;
    }

    const candidates = await Candidate.find(filter).lean();

    //! attach each candidate's latest interview + a feedback flag
    const withInterview = await Promise.all(
      candidates.map(async (c) => {
        //! newest interview for this candidate
        const latestInterview = await Interview.findOne({
          candidate: c._id,
        })
          .sort({ createdAt: -1 })
          .lean();

        return {
          ...c,
          latestInterview: latestInterview || null,
          //! true if there IS an interview AND it already has feedback
          hasInterviewFeedback: latestInterview
            ? Boolean(latestInterview.feedback)
            : false,
        };
      }),
    );

    return res.status(200).json({
      success: true,
      data: withInterview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
