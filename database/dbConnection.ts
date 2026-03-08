import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("database connection successfully!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
