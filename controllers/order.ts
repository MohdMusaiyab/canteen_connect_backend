import { Request, Response } from "express";
import { OrderModel } from "../models/orderModel";
import mongoose from "mongoose";
import { findUser } from "../utils/userUtils";
import { CartModel } from "../models/cartModel";
import { UserModel } from "../models/userModel";
import { io } from "../socket";
import { userSocketMap } from "../socket";
export const createOrderController = async (req: Request, res: Response) => {
  try {
    //Get the user, vendor, total and cart from the request body
    // The user will be then matched with the req.userID
    const userId = req.userId;

    const { user, vendor, total, cart } = req.body;
    //Validating the Object ID's of all of them
    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(vendor) ||
      !mongoose.Types.ObjectId.isValid(cart)
    ) {
      return res
        .status(400)
        .send({ message: "Invalid ID format", success: false });
    }
    //Checking if the User Exist or not
    const userExist = await UserModel.findById(userId);

    if (!userExist) {
      return res
        .status(400)
        .send({ message: "User not found", success: false });
    }
    // Checking if the Vendor Exist or not
    const vendorExist = await UserModel.findById(vendor);
    if (!vendorExist) {
      return res
        .status(400)
        .send({ message: "Vendor not found", success: false });
    }
    //Checking if the Cart Exist or not
    const cartExist = await CartModel.findById(cart);
    if (!cartExist) {
      return res
        .status(400)
        .send({ message: "Cart not found", success: false });
    }
    //Generating the OTP/Token
    const otp = Math.floor(1000 + Math.random() * 9000);
    //Creating the Order
    const order = new OrderModel({
      user,
      vendor,
      total,
      otp,
      cart,
    });
    await order.save();
    //Now we will emit the event to the vendor according to the socket ID
    const vendorId = vendor.toString();
    const socketIds = userSocketMap.get(vendorId); // Get all socket IDs for the vendor
    if (socketIds && socketIds.size > 0) {
      socketIds.forEach((socketId) => {
        io.to(socketId).emit("new_order", order); // Emit the 'new_order' event to each socket ID
        console.log(`Order sent to vendor with user ID ${vendorId} and socket ID ${socketId}`);
      });
    } else {
      console.log(`Vendor with user ID ${vendorId} is not connected.`);
    }

    res.status(201).send({ message: "Order created", success: true, otp });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

// ===============================Controller for accepting the order===============================
export const acceptOrderController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //Checking if the ID is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ message: "Invalid ID format", success: false });
    }
    //Finding the Order
    const order = await OrderModel.findById(id);
    if (!order) {
      return res
        .status(400)
        .send({ message: "Order not found", success: false });
    }
    //Checking if the Order is already accepted or not
    if (order.status == "accepted") {
      return res
        .status(400)
        .send({ message: "Order already accepted", success: false });
    }
    //Updating the Order
    order.status = "accepted";
    await order.save();
    res.status(200).send({ message: "Order accepted", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

// =================For Rejecting the Order==============
export const rejectOrderController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //Checking if the ID is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ message: "Invalid ID format", success: false });
    }
    //Finding the Order
    const order = await OrderModel.findById(id);
    if (!order) {
      return res
        .status(400)
        .send({ message: "Order not found", success: false });
    }
    //Checking if the Order is already accepted or not
    if (order.status == "accepted") {
      return res
        .status(400)
        .send({ message: "Order already accepted", success: false });
    }
    //Updating the Order to cancelled
    order.status = "cancelled";
    await order.save();
    res.status(200).send({ message: "Order rejected", success: true });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server error", success: false });
  }
};
