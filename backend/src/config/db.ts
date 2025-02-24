import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  console.log("Application is shutting down. Closing MongoDB connection...");
  await mongoose.disconnect();
  console.log("MongoDB disconnected. Exiting process.");
  process.exit(0);
});

export default connectDB;
