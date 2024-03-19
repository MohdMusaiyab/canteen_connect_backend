import { z } from "zod";
import mongoose from "mongoose";

// Define the Zod schema
const orderSchema = z.object({
  user: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data)),
  status: z.enum(["pending", "processing", "delivered", "cancelled"]),
  remarks: z.string().optional(),
});

// Define the Mongoose schema
const orderMongooseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "delivered", "cancelled"],
    default: "pending",
  },
  remarks: { type: String },
});

// Create the Mongoose model
const OrderModel = mongoose.model("Order", orderMongooseSchema);

export { orderSchema, OrderModel };
