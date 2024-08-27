import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAmenity = async (name) => {
  try {
    const newAmenity = await prisma.amenity.create({
      data: {
        name,
      },
    });
    return newAmenity;
  } catch (error) {
    throw new Error(`Failed to create amenity: ${error.message}`);
  }
};

export default createAmenity;
