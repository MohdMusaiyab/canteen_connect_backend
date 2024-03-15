import { Request, Response } from "express";
import { userSchema, UserModel } from "../models/userModel";
import { ZodError } from "zod";
import { findUser } from "../utils/userUtils";
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, contact, address } = req.body;
    console.log(req.body);
    if (!name || !email || !password || !contact || !address) {
      return res
        .status(400)
        .json({ error: "All fields are required", success: false });
    }
    const validatedData = userSchema.parse(req.body);
    //Check if user already exists
    const user = await findUser(email);
    //Creating User
    if (!user) {
      const user = new UserModel(validatedData);
      await user.save();
      res.status(201).json({ user, success: true });
    }
    //If user already exists
    else {
      res.status(400).json({ message: "User already exists", success: false });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue) => issue.message);
      res.status(400).json({ error: errorMessages, success: false });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.toString() });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occurred.", success: false });
    }
  }
};
