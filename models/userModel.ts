import { z } from "zod";
import mongoose from "mongoose";

const userSchema = z.object({
  name: z.string().min(2),
  email: z
    .string()
    .email()
    .refine((value) => value.includes("@kiet.edu"), {
      message: "Email must be from KIET domain (@kiet.edu).",
    }),
  contact: z.string().length(10),
  password: z.string().min(8),
  address: z.string().min(5),
  isAdmin: z.boolean().optional(),
  isOpen: z.boolean().optional(),
});

const userMongooseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, match: /@kiet.edu$/ },
  contact: { type: String, required: true, length: 10 },
  password: { type: String, required: true, minlength: 8 },
  address: { type: String, required: true, minlength: 5 },
  isAdmin: { type: Boolean, default: false },
  isOpen: { type: Boolean, default: true },
});

const UserModel = mongoose.model("User", userMongooseSchema);

export { userSchema, UserModel };