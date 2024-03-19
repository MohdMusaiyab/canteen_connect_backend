import { z } from 'zod';
import mongoose from 'mongoose';

// Define the Zod schema
const otpSchema = z.object({
  user: z.string().refine((data) => mongoose.Types.ObjectId.isValid(data)),
  otp: z.string().length(6),
  expiryDate: z.date(),
});

// Define the Mongoose schema
const otpMongooseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true, length: 6 },
  expiryDate: { type: Date, required: true },
});

// Create the Mongoose model
const OtpModel = mongoose.model('Otp', otpMongooseSchema);

export { otpSchema, OtpModel };