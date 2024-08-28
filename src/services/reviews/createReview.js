import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createReview = async (userId, propertyId, rating, comment) => {
  try {
    const newReview = await prisma.review.create({
      data: {
        userId,
        propertyId,
        rating,
        comment,
      },
    });
    return newReview;
  } catch (error) {
    throw new Error(`Failed to create review: ${error.message}`);
  }
};

export default createReview;
