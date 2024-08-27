import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight } = req.query;
    const pricePerNightFloat = parseFloat(pricePerNight);
    const properties = await getProperties(location, pricePerNightFloat);

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error in /properties endpoint:", error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const requiredFields = [
      "location",
      "description",
      "pricePerNight",
      "bedroomCount",
      "bathRoomCount",
      "maxGuestCount",
      "hostId",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const {
      title,
      location,
      description,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
    } = req.body;

    const newProperty = await createProperty(
      title,
      location,
      description,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId
    );

    if (!newProperty) {
      throw new Error(
        "Failed to create property. Please check the request data."
      );
    }

    res.status(201).json({
      message: `Property with id ${newProperty.id} successfully added`,
      property: newProperty,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

export default router;
