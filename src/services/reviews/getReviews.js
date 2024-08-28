import { PrismaClient } from "@prisma/client";

const getReviews = async () => {
  const prisma = new PrismaClient();

  return await prisma.review.findMany();
};

export default getReviews;
