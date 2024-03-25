import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from 'cors'

import { dbConnect } from "./config/dbConnect";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// =========================User Routes=======================
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
const main = async () => {
  await dbConnect();
};
main();


