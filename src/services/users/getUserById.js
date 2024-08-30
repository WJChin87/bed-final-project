import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient();

// const getUserById = async (id) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id },
//     });
//     return user;
//   } catch (error) {
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// export default getUserById;

const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getUserById;
