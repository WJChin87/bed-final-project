import { PrismaClient } from "@prisma/client";

const getAmenities = async () => {
  const prisma = new PrismaClient();

  return await prisma.amenity.findMany();
};

export default getAmenities;
