import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const getProductBySlugService = async (slug: string) => {
  const product = await prisma.product.findFirst({
    where: { slug, deletedAt: null },
  });

  if (!product) {
    throw new ApiError("Invalid Product Id", 400);
  }
  return product;
};
