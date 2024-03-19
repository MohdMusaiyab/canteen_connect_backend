import { Request, Response } from "express";
import { userSchema, UserModel } from "../models/userModel";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { checkPassword, hashPassword, generateToken } from "../utils/auth";
import { findUser } from "../utils/userUtils";
// ==========================Edit the Response so that Password is not Sent===================
// ============================Creating  a New User=============================
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, contact, address } = req.body;
    // console.log(req.body);
    if (!name || !email || !password || !contact || !address) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const validatedData = userSchema.parse(req.body);
    //Check if user already exists
    const user = await findUser(email);
    //Creating User
    if (!user) {
      validatedData.password = await hashPassword(validatedData.password);
      const user = new UserModel(validatedData);
      await user.save();
      res.status(201).json({ user, success: true, message: "User Created" });
    }
    //If user already exists
    else {
      res.status(400).json({ message: "User already exists", success: false });
    }
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

// ==============================Login Controller =======================
export const loginUserController = async (req: Request, res: Response) => {
  try {
    const user = await findUser(req.body.email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password.", success: false });
    }

    // Checking the Password
    const validPassword = await checkPassword(req.body.password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid email or password.", success: false });
    }

    // Generating  a JWT
    const token = generateToken(user._id.toString());
    res
      .status(200)
      .json({ token, success: true, user, message: "Login Successful" });
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
// ============================Update Profile User =============================

export const updateUserProfileController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const authToken = req?.headers?.authorization;
  if (!authToken || !id) {
    return res.status(400).json({ message: "Invalid Request", success: false });
  }
  try {
    const decodedToken = jwt.verify(authToken!, process.env.JWT_SECRET!);
    const userId = (decodedToken as any)?._id;

    // Check if userId is not available or does not match the requested id
    if (userId != id) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }

    // Proceed with updating the user
    const user = await UserModel.findById(id);

    if (!user) {
      return res
        .status(400)
        .send({ message: "User not found", success: false });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res
      .status(200)
      .send({ message: "User updated", updatedUser, success: true });
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

// ================================== Get Specific User========================
export const getUserController = async (req: Request, res: Response) => {
  try {
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
