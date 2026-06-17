import Candidate from "../../models/AddCandidate.model.js";

export const createCandidate = async (req, res) => {
  try {
    console.log("CANDIDATE : ", req.body);

    //! to get data from frontend
    const {
      candidate_Name,
      candidate_Email,
      candidate_PhoneNo,
      candidate_Location,
      candidate_Experience,
      candidate_Job,
      candidate_Skills,
      candidate_Status,
      candidate_Source,
      candidate_Resume,
      candidate_Notes,
    } = req.body;

    //! to create the form
    const candidate = await Candidate.create({
      fullname: candidate_Name,
      email: candidate_Email,
      phoneNo: candidate_PhoneNo,
      location: candidate_Location,
      experience: candidate_Experience,
      job: candidate_Job,
      skills: candidate_Skills,
      status: candidate_Status,
      source: candidate_Source,
      resume: candidate_Resume,
      notes: candidate_Notes,

      companyId: req.companyId,
      addedBy: req.userId,
    });

    //! send the response to frontend and stop funcion execution
    return res.status(201).json({
      success: true,
      message: "New candidate added Successfully.",
      data: candidate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
