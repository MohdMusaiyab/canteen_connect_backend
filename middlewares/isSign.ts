import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // If there's no token, return an error response
    return res
      .status(401)
      .json({ message: "Not authenticated", success: false });
  }
  console.log(authHeader);

  // Extract the token and verify format
  const token = authHeader.split(" ")[1]; // Assuming "Bearer <token>"

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
    };

    // Add the user id to the request object
    req.userId = decoded._id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return an error response
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

export default authenticateUser;
