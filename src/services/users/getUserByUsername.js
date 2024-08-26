import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUserByUsername(username) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getUserByUsername;
