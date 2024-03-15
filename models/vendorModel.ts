import { Schema, Document, model } from "mongoose";
interface Vendor extends Document {
  name: string;
  email: string;
  password: string;
  address: string;
}

interface MenuItem {
  name: string;
  price: number;
  description: string;
}

// Define the Vendor schema
const vendorSchema = new Schema<Vendor>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },

},{timestamps: true});

export default model<Vendor>("Vendor", vendorSchema);
