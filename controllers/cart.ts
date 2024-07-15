import { Request, Response } from "express";
import { CartModel } from "../models/cartModel";
import { findProduct } from "../utils/findProduct";

// =============================For Adding the Product to the Cart=============================

export const addProductController = async (req: Request, res: Response) => {
  try {
    const { id, productId } = req.body;
    const userId = req.userId;
    if (!id || !productId) {
      return res.status(400).send({ error: "Bad Request", success: false });
    }
    console.log(id, userId);
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
export const deleteProductController = (req: Request, res: Response) => {
  try {
    return res.send("Hello from Delete Product Controller");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Internal Server Error", success: false });
  }
};

// =============================For Gettingthe Cart================================
export const getUserCartController = (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Internal Server Error", success: false });
  }
};

// ==============================Increasing the Quantity of the Product in the Cart==============================

// ========================== Decrementing the Quantity of the Product in the Cart==================
