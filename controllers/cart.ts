import { Request, Response } from "express";
import { CartModel } from "../models/cartModel";
import { findProduct } from "../utils/findProduct";

// =============================For Adding the Product to the Cart=============================
export const addProductController =
  () => async (req: Request, res: Response) => {
    console.log("Req Recieved");
    const { id, productId } = req.body;
    const userId = req.userId;
    try {
      if (!id || !productId) {
        return res.status(400).send({ error: "Bad Request", success: false });
      }

      // Checking if the User is same or not
      if (id !== userId) {
        return res.status(401).send({ error: "Unauthorized", success: false });
      }

      // Finding the Product
      console.log("Finding Product");
      const product = await findProduct(productId);
      // If not found then finish the process
      if (!product) {
        return res
          .status(404)
          .send({ message: "Product Not Found", success: false });
      }

      // Finding the Cart according to the User
      let cart = await CartModel.findOne({ user: id });
      if (!cart) {
        // Now if the Cart is not there then create a new Cart
        cart = new CartModel({
          user: id,
          products: [{ product: productId, quantity: 1 }],
          total: product.price,
        });
        await cart.save();
        
      } else {
        // If the Cart is there then check for the product
        const productIndex = cart.products.findIndex(
          (item) => item.product.toString() === productId
        );

        if (productIndex === -1) {
          // If the product is not there then add the product
          cart.products.push({ product: productId, quantity: 1 });
          cart.total += product.price;
        } else {
          // If the product is already there then increase the quantity
          cart.products[productIndex].quantity++;
          cart.total += product.price;
        }
        await cart.save();
      }

      // Sending the response after processing the cart
      return res.status(200).send({
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
// export const addProductController=async(req:Request,res:Response)=>{
//     return res.send("Hello from Add Product Controller");
// }
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
