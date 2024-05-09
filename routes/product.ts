import Express from "express";
import authenticateUser from "../middlewares/isSign";
import { isAdmin } from "../middlewares/isAdmin";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductInfoController,
} from "../controllers/product";
const productRoutes = Express.Router();

productRoutes.get("/", (req, res) => {
  res.send("Hello from Product router");
});
productRoutes.post(
  "/create-product",
  authenticateUser,
  isAdmin,
  createProductController
);
productRoutes.put(
  "/update-product/:id",
  authenticateUser,
  isAdmin,
  updateProductInfoController
);
productRoutes.delete(
  "/delete-product/:id",
  authenticateUser,
  isAdmin,
  deleteProductController
);
// ==================================Needs to be checked=======================================
productRoutes.get("/get-products/:id", getAllProductsController); 

productRoutes.get("/get-single-product/:id",getSingleProductController);

export default productRoutes;
