import { User } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { hashPassword } from "../../lib/argon";

export const registerService = async (body: User) => {
  // cari tau dulu email sudah terpakai apa belum
  // kalo sudah terpakai, throw error
  // kalo belum terpakai, hash passwordnya user dan
  // buat user nya berdasarkan data yang dikirimkan

  const existingUser = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (existingUser) {
    throw new ApiError("Email already exists", 400);
  }

  const hashedPassword = await hashPassword(body.password);
  const newUser = await prisma.user.create({
    data: { ...body, password: hashedPassword },
    omit: { password: true },
  });

  return newUser;
};
