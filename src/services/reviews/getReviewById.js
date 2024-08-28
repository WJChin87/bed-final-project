import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getReviewById = async (id) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id },
    });
    return review;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getReviewById;
