import { prisma } from "../../lib/prisma";
import AppError from "../../utils/AppError";

const getMeFromDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      image: true,
      bio: true,
      isActive: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found", "USER_NOT_FOUND");
  }

  return user;
};

const getMySessionFromRequest = async (userId: string) => {
  const user = await getMeFromDB(userId);
  return user;
};

export const AuthService = {
  getMeFromDB,
  getMySessionFromRequest,
};
