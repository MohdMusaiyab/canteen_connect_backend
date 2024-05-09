import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/userModel";
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get the id from user and then check for the admin functionlitites

  const id = req.userId;
  const user = await UserModel.findById(id);
  if (user?.isAdmin == true) {
    next();
    return;
  }
  return res.status(401).send({
    success: false,
    message: "Unauthorised Access ! Admins Only",
  });
};



