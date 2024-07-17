import { z } from "zod";
import mongoose from "mongoose";
const cartSchema = z.object({
  user: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data)),
  products: z.array(
    z.object({
      product: z
        .string()
        .refine((data) => mongoose.Types.ObjectId.isValid(data)),
      quantity: z.number().min(1),
    })
  ),
  total: z.number().min(0),
});
const cartMongooseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        //Just Added Cost in Here for better
        // cost : { type: Number, required: true, min: 0 },
      },
    ],
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);
const CartModel = mongoose.model("Cart", cartMongooseSchema);
export { cartSchema, CartModel };
