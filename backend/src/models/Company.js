import mongoose from "mongoose";

//// Define Schema for   Registeration 

const companySchema = mongoose.Schema(
  {
    CompanyName: {
      type: String,
      required: [true, "Company name is required !"],
      trim: true,
    },
    domain: {
      type: String,
      required: [true, "domain is required !"],
      unique: true,
    },
    industry: String,
    companySize: String,
    location: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    subscriptionPlan: {
      type: String,
      enum: ["free", "pro", "enterprise"],
      default: "free",
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;