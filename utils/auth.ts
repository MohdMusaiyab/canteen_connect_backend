import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const generateToken = (userId: string) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET as string);
};
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
export const checkPassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};
