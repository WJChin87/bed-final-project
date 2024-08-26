import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getHostByUsername(username) {
  try {
    const host = await prisma.host.findUnique({
      where: {
        username,
      },
    });
    return host;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getHostByUsername;
