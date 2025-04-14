import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const deleteProductService = async (id: number, authUserId: number) => {
  const product = await prisma.product.findFirst({
    where: { id },
    include: { store: true },
  });

  if (!product) {
    throw new ApiError("Invalid Product Id", 400);
  }
  if (product.store.userId != authUserId) {
    throw new ApiError("Unothorised", 403);
  }

  await prisma.product.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return { message: "delete product success" };
};
