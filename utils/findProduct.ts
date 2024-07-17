import { ProductModel } from "../models/productModel";

export const findProduct = async (productId: string) => {
  const product = await ProductModel.findById(productId);
  if (!product) {
    return { success: false, message: "Product Not Found" };
  }
  return {
    success: true,
    product,
    price: product.price,
  };
};