import Job from "../../models/Job.model.js";

export const getAllJob = async (req, res) => {
  try {
    const fetchJob = await Job.find({
      companyId: req.companyId,
    })
      .populate("createdBy", "fullname")
      .sort({ createdAt: -1 });

    res.status(200).json(fetchJob);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
