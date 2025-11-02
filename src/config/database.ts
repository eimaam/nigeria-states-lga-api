import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";

export type NodeEnv = "development" | "production" | "test";

const NODE_ENV = process.env.NODE_ENV as NodeEnv;
const PROD_DB = process.env.PROD_MONGODB_URI as string;
const DEV_DB = process.env.DEV_MONGODB_URI as string;

const MONGODB_URI = NODE_ENV === "production" ? PROD_DB : DEV_DB;


export const connectDatabase = async (): Promise<void> => {
  try {
    if (!MONGODB_URI) {
      throw new Error("Missing db URI");
    }

    await mongoose.connect(MONGODB_URI);

    console.log(`✅ MongoDB connected successfully >> [${NODE_ENV}]`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB. Reconnecting...");
    connectDatabase();
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};


