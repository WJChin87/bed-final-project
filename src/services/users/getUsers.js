import { PrismaClient } from "@prisma/client";

// src/services/users/getUsers.js
const getUsers = async (filters = {}) => {
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

export default getUsers;
