import express from "express";
import { addProductController, deleteProductController } from "../controllers/cart";
import authenticateUser from "../middlewares/isSign";

const cartRoutes = express.Router();

cartRoutes.get("/", (req, res) => {
  res.send("Hello from Cart router");
});
// Need more things
cartRoutes.post("/add-product",authenticateUser,addProductController);
// ============Deleting/Removing the Product from the Cart================
cartRoutes.delete("/delete-product", authenticateUser, deleteProductController)

export default cartRoutes;
