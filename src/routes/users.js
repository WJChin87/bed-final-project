import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserByUsername from "../services/users/getUserByUsername.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

// src/routes/users.js
router.get(
  "/",
  async (req, res, next) => {
    const filters = {
      username: req.query.username,
      name: req.query.name,
      email: req.query.email,
      phoneNumber: req.query.phoneNumber,
    };

    const users = await getUsers(filters);
    res.status(200).json(users);
  },
  notFoundErrorHandler
);

router.post(
  "/",
  auth,
  async (req, res, next) => {
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
      // If the username already exists, use the existing user and return a message
      const message = "Username already exists. Please choose a different one.";
      res.status(201).json({ message });
      return;
    }

    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );

    res.status(201).json({
      message: "User successfully created!",
      user: newUser,
    });
  },
  notFoundErrorHandler
);

router.get(
  "/:id",
  async (req, res, next) => {
    console.log("req.params:", req.params);
    const { id } = req.params;
    const user = await getUserById(id);

    res.status(200).json(user);
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  auth,
  async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    res.status(200).json({
      message: `User with id ${deletedUser} successfully deleted`,
    });
  },
  notFoundErrorHandler
);

router.put(
  "/:id",
  auth,
  async (req, res) => {
    const { id } = req.params;
    const updatedUserData = req.body;
    const updatedUserById = await updateUserById(id, updatedUserData);

    res.status(200).json({
      message: `User with id ${id} successfully updated`,
      user: updatedUserById,
    });
  },
  notFoundErrorHandler
);

export default router;
