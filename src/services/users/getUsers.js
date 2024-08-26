import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email) => {
  const prisma = new PrismaClient();

  return await prisma.user.findMany({
    where: {
      username,
      email,
    },
  });
};

export default getUsers;
