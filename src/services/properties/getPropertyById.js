import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPropertyById = async (id) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });
    return property;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getPropertyById;
