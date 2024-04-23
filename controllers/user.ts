import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { OrderModel } from "../models/orderModel";
// ================================This need to be checked==============================
export const updateUserController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const {id} = req.params;
  if (id != userId) {
    return res.status(401).send({
      success: false,
      message: "You can only update your profile",
    });
  }
  try {
    // Get the user ID from the request
    let user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User Not Found",
      });
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.address) {
      user.address = req.body.address;
    }
    if (req.body.contact) {
      user.contact = req.body.contact;
    }
    user = await user.save();

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSingleUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (id != userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access ! You can only access your profile",
      });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      //   ================+Check the status Code of each of the following========================
      return res.status(404).send({
        success: false,
        messaage: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Profile Found",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSingleUserOrdersController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
   
    if (id !== userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access ! You can only access your orders",
      });
    }
    // ===Need to know if using User model or Order model================
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const orders=await OrderModel.find({user:id});
    return res.status(200).send({
      success: true,
      message: "User Orders Found",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
