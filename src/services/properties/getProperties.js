import { PrismaClient } from "@prisma/client";

const getProperties = async (filters = {}) => {
  const prisma = new PrismaClient();

  const where = {};

  if (filters.hostId) where.hostId = filters.hostId;
  if (filters.name) where.name = filters.name;
  if (filters.description) where.description = filters.description;
  if (filters.location) where.location = { contains: filters.location };
  if (filters.pricePerNight)
    where.pricePerNight = parseFloat(filters.pricePerNight);
  if (filters.bedroomCount) where.bedroomCount = filters.bedroomCount;
  if (filters.bathRoomCount) where.bathRoomCount = filters.bathRoomCount;
  if (filters.maxGuests) where.maxGuests = filters.maxGuests;
  if (filters.rating) where.rating = filters.rating;

  return await prisma.property.findMany({
    where,
  });
};

export default getProperties;
