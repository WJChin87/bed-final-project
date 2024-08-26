import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserByUsername from "../services/users/getUserByUsername.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const requiredFields = [
      "username",
      "password",
      "name",
      "email",
      "phoneNumber",
      "profilePicture",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    // Check if the username already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      throw new Error("Username is already taken");
    }

    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );

    if (!newUser) {
      throw new Error("Failed to create user. Please check the request data.");
    }

    res.status(201).json({
      message: `User with id ${newUser.id} successfully added`,
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

export default router;
