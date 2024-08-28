import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateReviewById = async (reviewId, updatedReviewData) => {
  try {
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: updatedReviewData,
    });

    return updatedReview;
  } catch (error) {
    if (error instanceof Error && error.code === "P2025") {
      return null; // Review / specified ID / not found
    } else {
      throw new Error(`Error in updating review: ${error.message}`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default updateReviewById;
