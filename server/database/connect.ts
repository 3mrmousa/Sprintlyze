import mongoose from "mongoose";

export const connectDB = async (url: string) => {
  if (!url) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
