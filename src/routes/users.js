import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserByUsername from "../services/users/getUserByUsername.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";

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

router.get("/:id", async (req, res, next) => {
  console.log("req.params:", req.params);
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json({ message: `User with id ${id} deleted` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
