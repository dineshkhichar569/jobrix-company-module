import mongoose from "mongoose";

////////   to connect mongoDB
const connnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB Connection Failed", error.message);
    process.exit(1);
  }
};

export default connnectDB;
