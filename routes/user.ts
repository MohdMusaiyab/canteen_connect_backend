import Express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/auth";
import { updateUserController } from "../controllers/user";
import { authenticateUser } from "../middlewares/isSign";
import {
  getSingleUserController,
  getSingleUserOrdersController,
} from "../controllers/user";
const userRoutes = Express.Router();

userRoutes.get("/", (req, res) => {
  res.send("Hello from user router");
});
userRoutes.post("/register-user", registerController);
userRoutes.post("/login", loginController);
userRoutes.put("/update-user/:id", authenticateUser, updateUserController);
userRoutes.get("/get-user/:id", authenticateUser, getSingleUserController);
userRoutes.get(
  "/get-orders/:id",
  authenticateUser,
  getSingleUserOrdersController
);
userRoutes.get("/me", authenticateUser, testController);

export default userRoutes;
