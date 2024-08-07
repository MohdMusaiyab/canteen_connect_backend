import { Request, Response } from "express";
import { productSchema, ProductModel } from "../models/productModel";
import { z } from "zod";
import mongoose from "mongoose";
// ===================Check the code below======================
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
    //Checking if the Product Already Exist or Not
    const productExist = await ProductModel.findOne({
      name: product.name,
      vendor: req.userId,
    });
    if (productExist) {
      return res
        .status(400)
        .send({ message: "Product already exists", success: false });
    }
    // Create the product

    const newProduct = new ProductModel(product);
    await newProduct.save();
    return res.status(201).send({
      message: "New Product Created Successfully",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send({ message: error.errors[0].message, success: false });
    }
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
};
// API for Updating the Product
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
        .send({ message: "Product not found", success: false });
    }

    if (product.vendor.toString() !== req.userId) {
      return res.status(403).send({
        message: "You are not authorized to update this product",
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

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
};
// ========================================Need Checking thorugh Postman=========================
// API for Deleting the Product
export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (!id) {
      return res
        .status(400)
        .send({ message: "Product ID is required", success: false });
    }
    const product = await ProductModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .send({ message: "Product not found", success: false });
    }
    if (product.vendor.toString() !== userId) {
      return res.status(403).send({
        message: "You are not authorized to delete this product",
        success: false,
      });
    }
    await product.deleteOne();
    return res
      .status(200)
      .send({ message: "Product deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
};
// ===========================================================================================================
// ===========================================NEEED TO CHECK THE BELOW CODE============================
// ==============Gettingg All the Products=============
export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Vendor ID is required", success: false });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Vendor ID format", success: false });
    }

    const products = await ProductModel.find({ vendor: id });

    // Check if products array is not found or empty
    if (!products || products.length === 0) {
      return res.status(404).send({ success: false, message: "No products Found" });
    }

    return res.status(200).send({ success: true, message: "Products Found", products });
  } catch (error) {
    console.error(error); // Changed to console.error for better error logging
    return res.status(500).send({ message: "An error occurred", success: false });
  }
};
// =========================================Chechk it====================================

export const getSingleProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    // Case where id is not found
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Product ID is required",
      });
    }
    // Case where id is not valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Product ID format",
      });
    }
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "No Products Found",
      });
    }
    return res.status(201).send({
      success: true,
      message: "Product Found",
    });
  } catch (error) {
    console.log(error);
    {
      return res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};
