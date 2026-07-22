import Candidate from "../../models/AddCandidate.model.js";
import CompanyUser from "../../models/CompanyUser.model.js";
import Job from "../../models/Job.model.js";

export const getAllMembers = async (req, res) => {
  try {
    const members = await CompanyUser.find({
      companyId: req.companyId,
    }).select("-password");

    // live counts to each member
    const withCounts = await Promise.all(
      members.map(async (member) => {
        const totalHired = await Candidate.countDocuments({
          addedBy: member._id,
          status: "Selected",
        });
        const activeJobs = await Job.countDocuments({
          createdBy: member._id,
        });
        return {
          ...member.toObject(),
          totalHired,
          activeJobs,
        };
      }),
    );

    res.status(200).json(withCounts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
