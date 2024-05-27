import { Request, Response } from "express";
import { categorySchema, CategoryModel } from "../models/categoryModel";
import { z } from "zod";
export const createCategoryController = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    const category = categorySchema.parse({ name, description, vendor: id });
    const newCategory = new CategoryModel(category);
    await newCategory.save();
    return res.status(201).send({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ message: error.errors, success: false });
    } else {
      return res
        .status(500)
        .send({ message: "Internal Server Error", success: false });
    }
    console.log(error);
  }
};
export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res
        .status(404)
        .send({ message: "Category not found", success: false });
    }
    if (name != undefined) {
      category.name = name;
    }
    if (description != undefined) {
      category.description = description;
    }
    await category.save();
    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};
export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};

export const getVendorCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const categories = await CategoryModel.find({ vendor: id });
    if (!categories) {
      return res
        .status(404)
        .send({ message: "Categories not found", success: false });
    }
    return res.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
};
