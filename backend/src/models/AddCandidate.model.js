import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number,
      min: 0,
      default: 0,
    },
    job: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Screening",
        "Shortlisted",
        "Interview Scheduled",
        "Selected",
        "Rejected",
        "On Hold",
      ],
      default: "Applied",
    },
    source: {
      type: String,
      enum: [
        "Website",
        "LinkedIn",
        "Naukri",
        "Referral",
        "Email",
        "Internshala",
        "Campus",
        "Walk-in",
      ],
      required: true,
    },
    resume: {
      type: String, // LinkedIn/resume URL
    },
    notes: {
      type: String,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// so that the same email not apply twice to the same job at the same company
candidateSchema.index(
  { companyId: 1, email: 1, job: 1 },
  { unique: true, sparse: true },
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
