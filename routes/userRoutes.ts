import express, { Request, Response } from "express";
import {
  createUserController,
  loginUserController,
  updateUserProfileController
} from "../controllers/userControllers";
import { verifyAdmin } from "../middlewares/isAdmin";
const router = express.Router();
router.get("/", (req: Request, res: Response) => {
  res.send("Hello User orutes");
});
// =============Registration and Login Routes================
router.post("/create-user", createUserController);
router.post("/login-user", loginUserController);
// ==============Profile Update===============================
router.put("/update-profile/:id", updateUserProfileController);

export default router;
