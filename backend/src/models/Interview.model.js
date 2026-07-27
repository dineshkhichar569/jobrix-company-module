import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    //! who is being interviewed
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },

    //! which job this interview is for
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    //! the team member conducting it
    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyUser",
      required: true,
    },

    //! when
    scheduledAt: {
      type: Date,
      required: true,
    },

    //! interview type
    mode: {
      type: String,
      enum: ["In-person", "Video", "Phone"],
      default: "Video",
    },

    //! round name
    round: {
      type: String,
      default: "Technical",
    },

    //! interview lifecycle status
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },

    //! filled after the interview
    feedback: {
      type: String,
    },

    //! interviewer recommendation after the round
    recommendation: {
      type: String,
      enum: ["Pending", "Proceed", "Reject", "Hold"],
      default: "Pending",
    },

    //! who created this interview record
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyUser",
    },
  },
  { timestamps: true },
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
