import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { dbConnect } from "./config/dbConnect";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
// =========================User Routes=======================
app.use("/api/v1/user", userRoutes);
// ===================Category Routes======================= 
app.use('/api/v1/category', categoryRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
const main = async () => {
  await dbConnect();
};
main();


