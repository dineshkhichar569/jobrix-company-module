import Job from "../../models/Job.model.js";

export const jobCreation = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const {
      jobTitle,
      jobDepartment,
      jobLocation,
      jobType,
      jobDescription,
      jobRequirement,
      jobStatus,
    } = req.body;

    const job = await Job.create({
      title: jobTitle,
      department: jobDepartment,
      location: jobLocation,
      jobType: jobType,
      description: jobDescription,
      requirements: jobRequirement,
      status: jobStatus,

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
