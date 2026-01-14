import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
    title: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    location: String,
    jobType: {
      type: String,
      enum: ["Full Time", "Internship", "Contract"],
      required: true,
    },
    description: String,
    requirements: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Paused"],
      default: "Open",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
