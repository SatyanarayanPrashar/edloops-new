import { User } from "@/types/resource";
import { Prisma } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAccount = async (accountData: User) => {

  try {
    const account = await prisma.user.create({
      data: accountData,
    });
    return account;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message);
    }

    throw error;
  }
};
