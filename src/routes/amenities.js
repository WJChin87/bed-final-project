import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  },
  notFoundErrorHandler
);

router.post(
  "/",
  auth,
  async (req, res, next) => {
    const requiredFields = ["name"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const { name } = req.body;

    const newAmenity = await createAmenity(name);

    res.status(201).json({
      message: "Amenity successfully created!",
      amenity: newAmenity,
    });
  },
  notFoundErrorHandler
);

router.get(
  "/:id",
  async (req, res, next) => {
    console.log("req.params:", req.params);
    const { id } = req.params;
    const amenity = await getAmenityById(id);

    res.status(200).json(amenity);
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  auth,
  async (req, res, next) => {
    const { id } = req.params;
    const deletedAmenity = await deleteAmenityById(id);

    res.status(200).json({
      message: `User with id ${deletedAmenity} successfully deleted`,
    });
  },
  notFoundErrorHandler
);

router.put(
  "/:id",
  auth,
  async (req, res) => {
    const { id } = req.params;
    const updatedAmenityData = req.body;
    const updatedAmenityById = await updateAmenityById(id, updatedAmenityData);

    res.status(200).json({
      message: `Amenity with id ${updatedAmenityById} successfully updated`,
      user: updatedAmenityById,
    });
  },
  notFoundErrorHandler
);

export default router;
