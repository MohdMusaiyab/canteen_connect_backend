import { z } from "zod";
import mongoose, { version } from "mongoose";

// Define the Zod schema
const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  vendor: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data)),
});

const categoryMongooseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2 },
    description: { type: String, required: true, minlength: 5 },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categoryMongooseSchema);

export { categorySchema, CategoryModel };
