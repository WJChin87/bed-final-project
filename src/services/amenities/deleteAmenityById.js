import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteAmenityById = async (id) => {
  try {
    const amenity = await prisma.amenity.delete({
      where: { id },
    });
    return amenity;
  } catch (error) {
    if (
      error instanceof Error &&
      error.code === "P2025" // Assuming 'P2025' is the correct error code for record not found
    ) {
      return null; // Amenity with the specified ID was not found
    } else {
      throw new Error(`Error in deleting amenity: ${error.message}`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default deleteAmenityById;
