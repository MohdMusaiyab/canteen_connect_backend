import { z } from "zod";
import mongoose from "mongoose";


const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().min(0),
  category: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data)),
  cookingTime: z.number().min(0),
  vendor: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data)),
  photo: z.string().optional(),
  quantity: z.number().min(0),
  isAvailable: z.boolean().optional(),
});

// Define the Mongoose schema
const productMongooseSchema = new mongoose.Schema(
  { 
    name: { type: String, required: true, minlength: 2 },
    description: { type: String, required: true, minlength: 5 },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    photo: { type: String, required: false },
    cookingTime: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Create the Mongoose model
const ProductModel = mongoose.model("Product", productMongooseSchema);

export { productSchema, ProductModel };
