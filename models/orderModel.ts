import { z } from "zod";
import mongoose from "mongoose";

// Define the Zod schema

const orderSchema = z.object({
  user: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data)),
  vendor: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data)),
  status: z.enum(["pending", "processing", "delivered", "cancelled"]),
  remarks: z.string().optional(),
  total: z.number().min(0),
  // Add a product array here
  products: z.array(
    z.object({
      productId: z.string(), // Assuming the product ID is a string
      quantity: z.number().min(0),
      price: z.number().min(0),
    })
  ),
});

// Define the Mongoose schema
const orderMongooseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "delivered", "cancelled"],
    default: "pending",
  },
  remarks: { type: String },
  total: { type: Number, required: true, min: 0 },

  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true, min: 0 },
      price: { type: Number, required: true, min: 0 },
    },
  ],
});

// Create the Mongoose model
const OrderModel = mongoose.model("Order", orderMongooseSchema);

export { orderSchema, OrderModel };
