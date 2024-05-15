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
      return res
        .status(409)
        .send({ message: "User already exists", success: false });
    }
    const hashedPassword = await hashPassword(password);
    userData.password = hashedPassword;
    const user = await UserModel.create(userData);
    return res
      .status(201)
      .send({ success: true, message: "User Created Successfully" });
  } catch (error) {
    // console.log(error);
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send({ message: error.errors[0].message, success: false });
    } else {
      return res
        .status(500)
        .send({ message: "Internal Server Error", success: false });
    }
  }
};
export const loginController = async (req: Request, res: Response) => {
  try {
    // const userData = userSchema.parse(req.body);
    const userData = LoginSchema.parse(req.body);
    const { email, password } = userData;
    const user = await findUser(email);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ message: "Invalid email or password", success: false });
    }
    const token = generateToken(user._id.toString());
    const { password: _, ...userWithoutPassword } = user;
    return res
      .status(200)
      .send({ success: true, user: userWithoutPassword, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send({ message: error.errors[0]?.message, success: false });
    } else {
      // console.log(error);
      return res
        .status(500)
        .send({ message: "Internal Server Error", success: false });
    }
  }
};

export const testController = async (req: Request, res: Response) => {
  return res.status(200).send("Hello from test controller");
};
