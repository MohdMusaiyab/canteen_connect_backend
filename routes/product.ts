import Express from "express";
import authenticateUser from "../middlewares/isSign";
import { isAdmin } from "../middlewares/isAdmin";
import { createProductController } from "../controllers/product";
const productRoutes = Express.Router();

productRoutes.get("/", (req, res) => {
  res.send("Hello from Product router");
});
// ==============================+Check it and then make the other ones=====================
productRoutes.post("/create-product",authenticateUser,isAdmin,createProductController);
export default productRoutes;