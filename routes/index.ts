import Express, { Router } from "express";
import userRoutes from "./user";
import categoryRoutes from "./category";
const rootRoutes: Router = Express.Router();
rootRoutes.use("/users", userRoutes);
rootRoutes.use("/category", categoryRoutes);
export default rootRoutes;
