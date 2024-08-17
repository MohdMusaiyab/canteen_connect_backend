import { z } from "zod";
import mongoose from "mongoose";

// Define the Zod schema

const orderSchema = z.object({
  user: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data)),
  vendor: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data)),
  status: z.enum([
    "pending",
    "accepted",
    "payment-awaited",
    "processing",
    "delivered",
    "cancelled",
  ]),

  total: z.number().min(0),

  otp: z.number().min(0),

  cart: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data)),
});

// Define the Mongoose schema
const orderMongooseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "payment-awaited",
        "processing",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    total: { type: Number, required: true, min: 0 },
    otp: { type: Number, required: true },

    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
  },
  { timestamps: true }
);

// Create the Mongoose model
const OrderModel = mongoose.model("Order", orderMongooseSchema);

export { orderSchema, OrderModel };
