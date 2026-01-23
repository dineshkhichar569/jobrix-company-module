import mongoose from "mongoose";

//  Define Schema for Recruiters / HR's / Admin

const companyUserSchema = mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phoneNo: {
      type: String,
      // required: true,
      unique: true,
    },
    gender: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    department: {
      type: String
    },
    role: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CompanyUser = mongoose.model("CompanyUser", companyUserSchema);

export default CompanyUser;
