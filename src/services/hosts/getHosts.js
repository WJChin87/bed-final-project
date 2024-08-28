import { PrismaClient } from "@prisma/client";

const getHosts = async (filters = {}) => {
  const prisma = new PrismaClient();

  const where = {};

  if (filters.username) where.username = filters.username;
  if (filters.name) where.name = filters.name;
  if (filters.email) where.email = filters.email;
  if (filters.phoneNumber) where.phoneNumber = filters.phoneNumber;

  return await prisma.user.findMany({
    where,
  });
};

export default getHosts;
