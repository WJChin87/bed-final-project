import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

export default router;
