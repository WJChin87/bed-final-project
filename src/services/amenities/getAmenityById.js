import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAmenityById = async (id) => {
  try {
    const amenity = await prisma.amenity.findUnique({
      where: { id },
    });
    return amenity;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getAmenityById;
