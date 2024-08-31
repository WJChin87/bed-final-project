import { PrismaClient } from "@prisma/client";

const getBookings = async (filters = {}) => {
  const prisma = new PrismaClient();

  const where = {};

  if (filters.userId) where.userId = filters.userId;
  if (filters.propertyId) where.propertyId = filters.propertyId;

  return await prisma.booking.findMany({
    where,
  });
};

export default getBookings;
