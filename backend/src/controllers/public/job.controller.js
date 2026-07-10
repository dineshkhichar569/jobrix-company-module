import Job from "../../models/Job.model.js";

export const jobCreation = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const {
      title,
      department,
      location,
      jobType,
      description,
      requirements,
      status,
    } = req.body;

    const job = await Job.create({
      title,
      department,
      location,
      jobType,
      description,
      requirements,
      status,

      companyId: req.companyId,
      createdBy: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
