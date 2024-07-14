import { ProductModel } from "../models/productModel";
export const findProduct = async (productId: string) => {
  const product = await ProductModel.findById(productId);
  if (!product) {
    return null;
  }
  return {
    product,
    price: product.price,
  };
};
