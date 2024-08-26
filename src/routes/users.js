import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";

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
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;

    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );

    if (newUser) {
      res.status(201).json({
        message: `User with id ${newUser.id} successfully added`,
        user: newUser,
      });
    } else {
      res.status(400).json({
        message: "User creation error",
      });
    }
  } catch (error) {
    console.error("User creation error:", error);
    next(error);
  }
});

export default router;
