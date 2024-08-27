import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostByUsername from "../services/hosts/getHostByUsername.js";
import getHostById from "../services/hosts/getHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const hosts = await getHosts();
    res.json(hosts);
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
      "aboutMe",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
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
      throw new Error("Username is already taken");
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

    if (!newHost) {
      throw new Error("Failed to create host. Please check the request data.");
    }

    res.status(201).json({
      message: `Host with id ${newHost.id} successfully added`,
      host: newHost,
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
    const host = await getHostById(id);

    if (!host) {
      res.status(404).json({ message: `Host with id ${id} not found` });
    } else {
      res.status(200).json(host);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedHost = await deleteHostById(id);
    if (!deletedHost) {
      res.status(404).json({ message: `Host with id ${id} not found` });
    } else {
      res.status(200).json({ message: `Host with id ${id} deleted` });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedHostData = req.body;
  const updatedHostById = await updateHostById(id, updatedHostData);

  if (updatedHostById) {
    res.status(200).json({
      message: `Host with id ${id} successfully updated`,
      updatedHostById,
    });
  } else {
    return res.status(404).json({
      message: `Host with id ${id} not found`,
    });
  }
});

export default router;
