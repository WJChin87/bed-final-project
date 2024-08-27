import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updatePropertyById = async (propertyId, updatedPropertyData) => {
  try {
    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: updatedPropertyData,
    });

    return updatedProperty;
  } catch (error) {
    if (error instanceof Error && error.code === "P2025") {
      return null; // property / specified ID / not found
    } else {
      throw new Error(`Error in updating property: ${error.message}`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default updatePropertyById;
