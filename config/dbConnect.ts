import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const dbConnect = async () => {
  mongoose
    .connect(process.env.MONGO_URI as string, {})
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err));
};
