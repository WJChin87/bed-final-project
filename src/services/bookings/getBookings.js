import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookings = async () => {
  try {
    const bookings = await prisma.booking.findMany();
    return bookings;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getBookings;
