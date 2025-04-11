import { Product } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const updateProductService = async (
  id: number,
  body: Partial<Product>
) => {
  const product = await prisma.product.findFirst({
    where: { id },
  });

  if (!product) {
    throw new ApiError("Invalid product id", 400);
  }

  if (body.name) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: body.name },
    });

    if (existingProduct) {
      throw new ApiError("Product name already exists", 400);
    }
  }
  const updateProduct = await prisma.product.update({
    where: { id },
    data: body,
  });

  return { message: "Update product success", updateProduct };
};
