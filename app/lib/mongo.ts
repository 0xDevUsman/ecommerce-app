import mongoose from "mongoose";

const mongodb_url = process.env.MONGODB_URL as string;

if (!mongodb_url) {
  throw new Error("MONGODB_URL is not set in environment variables");
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB is already connected");
      return;
    }

    await mongoose.connect(mongodb_url, {
      dbName: "ecommerce_db",
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
