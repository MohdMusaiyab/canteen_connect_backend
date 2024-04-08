import { Request, Response, NextFunction } from "express";
import { userSchema, UserModel } from "../models/userModel";
import { z } from "zod";
import { LoginSchema } from "../schemas/auth";
import { checkPassword, generateToken, hashPassword } from "../utils/auth";
import { findUser } from "../utils/userUtils";
export const registerController = async (req: Request, res: Response) => {
  try {
    const userData = userSchema.parse(req.body);
    const { email, password } = userData;
    //Checking for existing user
    const existingUser = await findUser(email);
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    userData.password = hashedPassword;
    const user = await UserModel.create(userData);
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully", user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.log(error);
  }
};
export const loginController = async (req: Request, res: Response) => {
  try {
    // const userData = userSchema.parse(req.body);
    const userData = LoginSchema.parse(req.body);
    const { email, password } = userData;
    const user = await findUser(email);
    if (!user) {
      return res.status(404).json({ error: "User not found", success: false });
    }
    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Invalid email or password", success: false });
    }
    const token = generateToken(user._id.toString());
    return res.status(200).json({ success: true, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    } else {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const testController = async (req: Request, res: Response) => {
  return res.status(200).send("Hello from test controller");
};

// =======Updating the Profile===============
export const updateUserController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const id = req.body._id;
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
