import { Router } from "express";
import getUsers from "../services/users/getUsers.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
