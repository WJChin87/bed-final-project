import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHostById = async (id) => {
  try {
    const host = await prisma.host.findUnique({
      where: { id },
    });
    return host;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getHostById;
