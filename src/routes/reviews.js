import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const requiredFields = ["userId", "propertyId", "rating", "comment"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const { userId, propertyId, rating, comment } = req.body;

    const newReview = await createReview(userId, propertyId, rating, comment);

    if (!newReview) {
      throw new Error(
        "Failed to create review. Please check the request data."
      );
    }

    res.status(201).json({
      message: `Review with id ${newReview.id} successfully added`,
      review: newReview,
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
    const review = await getReviewById(id);

    if (!review) {
      res.status(404).json({ message: `Review with id ${id} not found` });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReview = await deleteReviewById(id);
    if (!deletedReview) {
      res.status(404).json({ message: `Review with id ${id} not found` });
    } else {
      res.status(200).json({ message: `Review with id ${id} deleted` });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const updatedReviewData = req.body;
  const updatedReviewById = await updateReviewById(id, updatedReviewData);

  if (updatedReviewById) {
    res.status(200).json({
      message: `Review with id ${id} successfully updated`,
      updatedReviewById,
    });
  } else {
    return res.status(404).json({
      message: `Review with id ${id} not found`,
    });
  }
});

export default router;
