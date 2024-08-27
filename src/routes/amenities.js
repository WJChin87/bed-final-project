import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const requiredFields = ["name"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const { name } = req.body;

    const newAmenity = await createAmenity(name);

    if (!newAmenity) {
      throw new Error(
        "Failed to create amenity. Please check the request data."
      );
    }

    res.status(201).json({
      message: `Amenity with id ${newAmenity.id} successfully added`,
      amenity: newAmenity,
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
    const amenity = await getAmenityById(id);

    if (!amenity) {
      res.status(404).json({ message: `Amenity with id ${id} not found` });
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAmenity = await deleteAmenityById(id);
    if (!deletedAmenity) {
      res.status(404).json({ message: `Amenity with id ${id} not found` });
    } else {
      res.status(200).json({ message: `Amenity with id ${id} deleted` });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedAmenityData = req.body;
  const updatedAmenityById = await updateAmenityById(id, updatedAmenityData);

  if (updatedAmenityById) {
    res.status(200).json({
      message: `Amenity with id ${id} successfully updated`,
      updatedAmenityById,
    });
  } else {
    return res.status(404).json({
      message: `Amenity with id ${id} not found`,
    });
  }
});

export default router;
