import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware function to check if user is authenticated
function authenticateUser(req: Request, res: Response, next: NextFunction) {
  // Extract the token from the request headers
  const token = req.headers.authorization?.split(" ")[1];

  // If token is not provided, proceed without attaching user information
  if (!token) {
    return next(); // Proceed to the next middleware or route handler
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Attach the decoded user information to the request object
    (req as any).user = decoded; // Using type assertion to avoid TypeScript errors

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return unauthorized error
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export { authenticateUser };
