import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  },
  notFoundErrorHandler
);

router.post(
  "/",
  auth,
  async (req, res, next) => {
    const requiredFields = ["userId", "propertyId", "rating", "comment"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const { userId, propertyId, rating, comment } = req.body;

    const newReview = await createReview(userId, propertyId, rating, comment);

    res.status(201).json({
      message: "Review successfully created!",
      review: newReview,
    });
  },
  notFoundErrorHandler
);

router.get("/:id", async (req, res, next) => {
  console.log("req.params:", req.params);
  const { id } = req.params;
  const review = await getReviewById(id);

  if (review) {
    res.status(200).json(review);
  } else {
    res.status(404).json({ message: `Review not found` });
  }
  notFoundErrorHandler;
});

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  const deletedReview = await deleteReviewById(id);

  if (deletedReview) {
    res.status(200).json({ message: `Review with id ${id} deleted` });
  } else {
    res.status(404).json({ message: `Review with id ${id} not found` });
  }
  notFoundErrorHandler;
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

  notFoundErrorHandler;
});

export default router;
