import Job from "../../models/Job.model.js";

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      data: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
