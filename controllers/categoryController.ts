import { Request, Response } from "express";
import createCategory from "../dto/category/createCategory";
import { CategoryModel, categorySchema } from "../models/categoryModel";
export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const data: createCategory = req.body;
    // Check if the category already exists
    const categoryExists = await CategoryModel.findOne()
      .where("name")
      .equals(data.name);
    if (categoryExists) {
      return res
        .status(400)
        .json({ message: "Category already exists", success: false });
    }
    // Validate the data
    const validatedData = categorySchema.safeParse(data);
    if (!validatedData.success) {
      return res
        .status(400)
        .json({ message: validatedData.error, success: false });
    }
    // Create the category
    const category = await CategoryModel.create(data);
    res
      .status(201)
      .json({ message: "Category created", success: true, category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
