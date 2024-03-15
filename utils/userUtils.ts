import { UserModel } from "../models/userModel";
export const findUser = async (email: string) => {
  const user = await UserModel.findOne({ email: email });
  return user;
};
