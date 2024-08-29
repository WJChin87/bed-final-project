import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    const filters = {
      hostId: req.query.hostId,
      name: req.query.name,
      description: req.query.description,
      location: req.query.location,
      pricePerNight: req.query.pricePerNight,
      bedroomCount: req.query.bedroomCount,
      bathRoomCount: req.query.bathRoomCount,
      maxGuestCount: req.query.maxGuestCount,
      rating: req.query.rating,
    };

    const properties = await getProperties(filters);
    res.status(200).json(properties);
  },
  notFoundErrorHandler
);

router.post(
  "/",
  auth,
  async (req, res, next) => {
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

    res.status(201).json({
      message: "Property successfully created!",
      user: newProperty,
    });
  },
  notFoundErrorHandler
);

router.get(
  "/:id",
  async (req, res, next) => {
    console.log("req.params:", req.params);
    const { id } = req.params;
    const property = await getPropertyById(id);

    res.status(200).json(property);
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  auth,
  async (req, res, next) => {
    const { id } = req.params;
    const deletedProperty = await deletePropertyById(id);
    res.status(200).json({
      message: `Property with id ${deletedProperty} successfully deleted`,
    });
  },
  notFoundErrorHandler
);

router.put(
  "/:id",
  auth,
  async (req, res) => {
    const { id } = req.params;
    const updatedPropertyData = req.body;
    const updatedPropertyById = await updatePropertyById(
      id,
      updatedPropertyData
    );

    res.status(200).json({
      message: `Property with id ${updatedPropertyById} successfully updated`,
      user: updatedPropertyById,
    });
  },
  notFoundErrorHandler
);

export default router;
