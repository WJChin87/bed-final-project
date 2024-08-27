import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deletePropertyById = async (id) => {
  try {
    const property = await prisma.property.delete({
      where: { id },
    });
    return property;
  } catch (error) {
    if (
      error instanceof Error &&
      error.code === "P2025" // Assuming 'P2025' is the correct error code for record not found
    ) {
      return null; // Property with the specified ID was not found
    } else {
      throw new Error(`Error in deleting property: ${error.message}`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default deletePropertyById;
