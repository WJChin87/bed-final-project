import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  try {
    const newBooking = await prisma.booking.create({
      data: {
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus: bookingStatus || "pending",
      },
    });
    return newBooking;
  } catch (error) {
    throw new Error(`Failed to create booking: ${error.message}`);
  }
};

export default createBooking;
