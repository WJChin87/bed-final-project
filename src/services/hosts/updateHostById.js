import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateHostById = async (hostId, updatedHostData) => {
  try {
    const updatedHost = await prisma.host.update({
      where: { id: hostId },
      data: updatedHostData,
    });

    return updatedHost;
  } catch (error) {
    if (error instanceof Error && error.code === "P2025") {
      return null; // Host / specified ID / not found
    } else {
      throw new Error(`Error in updating host: ${error.message}`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default updateHostById;
