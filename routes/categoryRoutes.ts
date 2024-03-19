import express, { Request, Response } from "express";
import { createCategoryController } from "../controllers/categoryController";
import { verifyAdmin } from "../middlewares/isAdmin";
const router = express.Router();

// ===================Creating the Category=============
router.post("/create-category", verifyAdmin, createCategoryController);
export default router;
