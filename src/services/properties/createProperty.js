import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId
) => {
  try {
    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        location,
        pricePerNight: parseFloat(pricePerNight),
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        host: { connect: { id: hostId } },
      },
    });
    return newProperty;
  } catch (error) {
    throw new Error(`Failed to create property: ${error.message}`);
  }
};

export default createProperty;
