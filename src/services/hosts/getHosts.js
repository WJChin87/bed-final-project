import { PrismaClient } from "@prisma/client";

const getHosts = async (username, email) => {
  const prisma = new PrismaClient();

  return await prisma.host.findMany({
    where: {
      username,
      email,
    },
  });
};

export default getHosts;
