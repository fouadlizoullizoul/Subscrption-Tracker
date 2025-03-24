import { DATABASE_URL, NODE_ENV } from "../config/env.js";
import mongoose from "mongoose";

if (!DATABASE_URL) {
  throw new Error("No database connection URL provided.");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to database", error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
