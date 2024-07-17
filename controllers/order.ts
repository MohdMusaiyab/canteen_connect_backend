import { Request, Response } from "express";
import { OrderModel } from "../models/orderModel";
export const createOrderController = async (req: Request, res: Response) => {
  // Getting the id of the user who is making
  const userId = req?.userId;
  // We have to create the order for the vendor from the User
// Order will be created from the Cart Items
  // ==========Modify the Schema and make a create order Controller==================
  
};
