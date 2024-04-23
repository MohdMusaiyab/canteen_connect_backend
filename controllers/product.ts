import { Request, Response } from "express";
import { productSchema, ProductModel } from "../models/productModel";
import { z } from "zod";
// ===================Check the code below======================
export const createProductController = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, cookingTime, photo } = req.body;
    // Validate the request body
    const product = productSchema.parse({
      name,
      description,
      price,
      category,
      cookingTime,
      vendor: req.userId,
      photo,
    });
    // Create the product
    const newProduct = new ProductModel(product);
    await newProduct.save();
    return res.status(201).json({
      message: "New Product Created Successfully",
      success: true,
      data: newProduct,
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
