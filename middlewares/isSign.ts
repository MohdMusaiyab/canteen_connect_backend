import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization;
  // const token = authHeader && authHeader.split(' ')[1];
  // console.log(token)

  if (!token) {
    // If there's no token, the user is not authenticated
    return res.status(401).send({ message: "Not authenticated" ,success:false});
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // console.log("Decoded values",decoded);
    // Add the user data to the request object
    const { _id } = decoded as { _id: string };
    // console.log("User id",_id)
    req.userId = _id;
    // console.log("User id",req.userId)
    next();
  } catch (error) {
    // If token verification fails, return an error
    return res.status(401).send({ message: "Invalid token", success: false });
  }
};

export default authenticateUser;
