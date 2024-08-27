import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteBookingById = async (id) => {
  try {
    const booking = await prisma.booking.delete({
      where: { id },
    });
    return booking;
  } catch (error) {
    if (
      error instanceof Error &&
      error.code === "P2025" // Assuming 'P2025' is the correct error code for record not found
    ) {
      return null; // Booking with the specified ID was not found
    } else {
      throw new Error(`Error in deleting booking: ${error.message}`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default deleteBookingById;
