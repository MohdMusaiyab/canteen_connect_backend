import  Express  from "express";
import { loginController, registerController } from "../controllers/auth";
import { authenticateUser } from "../middlewares/isSign";
const userRoutes = Express.Router();

userRoutes.get("/", (req, res) => {
  res.send("Hello from user router");
});
userRoutes.post("/register-user",registerController);
userRoutes.post("/login",loginController);
// userRoutes.get("/me",authenticateUser,testController)
export default userRoutes;

