import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the JWT token from the request headers
    const token = req.headers.authorization;

    // Verify the token and decode its payload
    const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string); // Replace "your_secret_key" with your actual secret key
    if (typeof decodedToken === "object" && "_id" in decodedToken) {
      const userId = decodedToken._id;
      // ...
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      if (!user.isAdmin) {
        return res.status(403).json({ message: "User is not an admin." });
      }
      next();
    }
  } catch (error) {
    // Handle errors
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
