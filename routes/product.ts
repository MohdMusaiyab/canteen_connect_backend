import Express from "express";
import authenticateUser from "../middlewares/isSign";
import { isAdmin } from "../middlewares/isAdmin";
import { createProductController ,updateProductInfoController} from "../controllers/product";
const productRoutes = Express.Router();

productRoutes.get("/", (req, res) => {
  res.send("Hello from Product router");
});
productRoutes.post("/create-product",authenticateUser,isAdmin,createProductController);
productRoutes.put("/update-product/:id",authenticateUser,isAdmin,updateProductInfoController);
export default productRoutes;