import Express, { Router } from "express";
import userRoutes from "./user";
const rootRoutes:Router = Express.Router();
rootRoutes.use("/users", userRoutes);
export default rootRoutes;
