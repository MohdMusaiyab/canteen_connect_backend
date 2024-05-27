import Express from "express";
import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getVendorCategoriesController,
} from "../controllers/category";
import { isAdmin } from "../middlewares/isAdmin";
import authenticateUser from "../middlewares/isSign";

const categoryRoutes = Express.Router();

categoryRoutes.get("/", (req, res) => {
  res.send("Hello from Category router");
});
categoryRoutes.post(
  "/create-category/:id",
  authenticateUser,
  isAdmin,
  createCategoryController
);
// =====Check Update Category Controller================
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

categoryRoutes.get(
  "/get-vendor-categories/:id",
  authenticateUser,
  getVendorCategoriesController
);
export default categoryRoutes;
