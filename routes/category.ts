import Express from "express";
import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category";
import { isAdmin } from "../middlewares/isAdmin";
import authenticateUser from "../middlewares/isSign";

const categoryRoutes = Express.Router();

categoryRoutes.get("/", (req, res) => {
  res.send("Hello from Category router");
});
categoryRoutes.post(
  "/create-category",
  authenticateUser,
  isAdmin,
  createCategoryController
);

categoryRoutes.put(
  "/update-category/:id",
  authenticateUser,
  isAdmin,
  updateCategoryController
);
categoryRoutes.delete(
  "/delete-category/:id",
  authenticateUser,
  isAdmin,
  deleteCategoryController
);
export default categoryRoutes;
