import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostByUsername from "../services/hosts/getHostByUsername.js";
import getHostById from "../services/hosts/getHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    const filters = {
      username: req.query.username,
      name: req.query.name,
      email: req.query.email,
      phoneNumber: req.query.phoneNumber,
    };

    const hosts = await getHosts(filters);
    res.status(200).json(hosts);
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
      "aboutMe",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    // Check if the username already exists
    const existingHost = await getHostByUsername(username);
    if (existingHost) {
      // If the username already exists, use the existing user and return a message
      const message = "Username already exists. Please choose a different one.";
      res.status(201).json({ message });
      return;
    }

    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json({
      message: "Host successfully created!",
      host: newHost,
    });
  },
  notFoundErrorHandler
);

router.get(
  "/:id",
  async (req, res, next) => {
    console.log("req.params:", req.params);
    const { id } = req.params;
    const host = await getHostById(id);

    res.status(200).json(host);
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  auth,
  async (req, res, next) => {
    const { id } = req.params;
    const deletedHost = await deleteHostById(id);

    res.status(200).json({
      message: `Host with id ${deletedHost} was deleted!`,
    });
  },
  notFoundErrorHandler
);

router.put(
  "/:id",
  auth,
  async (req, res) => {
    const { id } = req.params;
    const updatedHostData = req.body;
    const updatedHostById = await updateHostById(id, updatedHostData);

    res.status(200).json({
      message: `Host with id ${id} successfully updated`,
      user: updatedHostById,
    });
  },
  notFoundErrorHandler
);

export default router;
