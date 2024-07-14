import Express, { Router } from "express";
import userRoutes from "./user";
import categoryRoutes from "./category";
import productRoutes from "./product";
import orderRoutes from "./order";
import cartRoutes from "./cart";
const rootRoutes: Router = Express.Router();
rootRoutes.use("/users", userRoutes);
rootRoutes.use("/category", categoryRoutes);
rootRoutes.use("/product", productRoutes);
rootRoutes.use("/order", orderRoutes);
rootRoutes.use('/cart',cartRoutes);

export default rootRoutes;
