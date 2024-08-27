import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteHostById = async (id) => {
  try {
    const host = await prisma.host.delete({
      where: { id },
    });
    return host;
  } catch (error) {
    if (
      error instanceof Error &&
      error.code === "P2025" // Assuming 'P2025' is the correct error code for record not found
    ) {
      return null; // Host with the specified ID was not found
    } else {
      throw new Error(`Error in deleting host: ${error.message}`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default deleteHostById;
