import { Request, Response } from "express";
import { CartModel } from "../models/cartModel";
import { findProduct } from "../utils/findProduct";
import mongoose from "mongoose";

// =============================For Adding the Product to the Cart=============================

export const addProductController = async (req: Request, res: Response) => {
  try {
    const { id, productId } = req.body;
    const userId = req.userId;
    if (!id || !productId) {
      return res.status(400).send({ error: "Bad Request", success: false });
    }
    console.log(id, userId);
    if (mongoose.Types.ObjectId.isValid(id) === false) {
      return res.status(400).send({ error: "Invalid User Id", success: false });
    }
    if (id !== userId) {
      return res.status(401).send({ error: "Unauthorized", success: false });
    }
    if (!id || !productId || !/^[0-9a-fA-F]{24}$/.test(productId)) {
      return res
        .status(400)
        .send({ error: "Invalid productId", success: false });
    }
    const result = await findProduct(productId);
    if (!result.success) {
      return res.status(404).send({ message: result.message, success: false });
    }

    let cart = await CartModel.findOne({ user: id });
    if (!cart) {
      cart = new CartModel({
        user: id,
        products: [{ product: productId, quantity: 1 }],
        total: result.price,
      });
      await cart.save();
    } else {
      //Means Cart is already there
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
      const price = result.price ?? 0;
      if (productIndex === -1) {
        cart.products.push({ product: productId, quantity: 1 });
        cart.total += price;
      } else {
        cart.products[productIndex].quantity++;
        cart.total += price;
      }
      await cart.save();
    }

    return res.send({
      cart,
      success: true,
      message: "Product Added to the Cart",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Internal Server Error", success: false });
  }
};
// ===============================For Deleting the Product from the Cart================================
export const removeProductController = async (req: Request, res: Response) => {
  try {
    const { id, productId } = req.body;
    const userId = req.userId;

    if (!id || !productId) {
      return res.status(400).send({ error: "Bad Request", success: false });
    }

    if (mongoose.Types.ObjectId.isValid(id) === false) {
      return res.status(400).send({ error: "Invalid User Id", success: false });
    }

    if (id !== userId) {
      return res.status(401).send({ error: "Unauthorized", success: false });
    }

    if (!id || !productId || !/^[0-9a-fA-F]{24}$/.test(productId)) {
      return res
        .status(400)
        .send({ error: "Invalid productId", success: false });
    }

    const result = await findProduct(productId);
    if (!result.success) {
      return res.status(404).send({ message: result.message, success: false });
    }

    let cart = await CartModel.findOne({ user: id });
    if (!cart) {
      return res
        .status(404)
        .send({ success: false, message: "No cart found for the user" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found in the cart" });
    }

    const price = result.price ?? 0;
    const productQuantity = cart.products[productIndex].quantity;

    if (productQuantity > 1) {
      cart.products[productIndex].quantity--;
      cart.total -= price;
    } else {
      cart.products.splice(productIndex, 1);
      cart.total -= price;
    }

    await cart.save();

    return res.send({
      cart,
      success: true,
      message: "Product removed from the Cart",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Internal Server Error", success: false });
  }
};

// =============================For Getting the Cart of a Single User================================

export const getUserCartController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!id || !userId) {
      return res
        .status(400)
        .send({ error: "User ID is required", success: false });
    }

    if (mongoose.Types.ObjectId.isValid(id) === false) {
      return res
        .status(400)
        .send({ error: "Invalid User Id format", success: false });
    }

    if (id !== userId) {
      return res
        .status(401)
        .send({ error: "Unauthorized access", success: false });
    }

    const cart = await CartModel.findOne({ user: id }).populate(
      "products.product"
    );

    if (!cart) {
      return res
        .status(404)
        .send({ success: false, message: "Cart not found" });
    }

    return res.send({
      cart,
      success: true,
      message: "Cart retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Internal Server Error", success: false });
  }
};


