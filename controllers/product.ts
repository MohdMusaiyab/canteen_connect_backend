import { Request, Response } from "express";
import { productSchema, ProductModel } from "../models/productModel";
import { z } from "zod";
// ===================Check the code below======================
// Create is working fine
export const createProductController = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, cookingTime, photo, quantity } =
      req.body;
    // Validate the request body
    const product = productSchema.parse({
      name,
      description,
      price,
      category,
      cookingTime,
      vendor: req.userId,
      photo,
      quantity,
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
// =========================Need to be done=========================
// Updating the Product
export const updateProductInfoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, description, price, category, cookingTime, photo, quantity } =
      req.body;
    const { id } = req.params;

    const product = await ProductModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ error: "Product not found", success: false });
    }

    if (product.vendor.toString() !== req.userId) {
      return res.status(403).json({
        error: "You are not authorized to update this product",
        success: false,
      });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category && product.category.toString() !== category)
      product.category = category;
    if (cookingTime) product.cookingTime = cookingTime;
    if (photo) product.photo = photo;
    if (quantity) product.quantity = quantity;

    await product.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
};
