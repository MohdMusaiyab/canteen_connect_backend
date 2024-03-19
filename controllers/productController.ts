import { Request, Response } from "express";
import { ZodError } from "zod";
import { productSchema, ProductModel } from "../models/productModel";
export const createProductController = async (req: Request, res: Response) => {
  try {
    // Well we will get everything from the request body including the image , user id and  category id
    // and then we will validate the request body
    // then we will save the product to the database
    // Write a line to validate the request body

    const { name, description, price, category, image, userId, cookingTime } =
      req.body;
    const validatedData = productSchema.parse(req.body);
    const product = new ProductModel({
      name,
      description,
      price,
      category,
      user: userId,
      photo: image,
      cookingTime,
    });
    await product.save();
    return res
      .status(201)
      .json({
        product,
        success: true,
        message: "Product Created Successfully",
      });
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue) => issue.message);
      res.status(400).json({ message: errorMessages, success: false });
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.toString() });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occurred.", success: false });
    }
  }
};
