import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  try {
    const newHost = await prisma.host.create({
      data: {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      },
    });
    return newHost;
  } catch (error) {
    throw new Error(`Failed to create host: ${error.message}`);
  }
};

export default createHost;
