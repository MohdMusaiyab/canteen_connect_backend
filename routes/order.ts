import Express from "express";
import { createOrderController } from "../controllers/order";
import authenticateUser from "../middlewares/isSign";
const orderRoutes = Express.Router();

// ==============================+Check it and then make the other ones=====================

orderRoutes.post("/create-order", authenticateUser, createOrderController);
export default orderRoutes;
