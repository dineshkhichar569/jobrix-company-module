import mongoose from "mongoose";

//// Define Schema

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Name is required !"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required !"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@+$]+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, , "Password is required !"],
      minLength: 6,
      select: false, ////    this is very important foor security reasons due to this user cannot select password
    },
  },
  { Timestamp: true }
);

const User = mongoose.model("User", userSchema);

export default User;
