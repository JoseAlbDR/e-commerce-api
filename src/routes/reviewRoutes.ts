import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from "../controllers/reviewController";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";

const router = express.Router();

router
  .route("/")
  .get(getAllReviews)
  .post(authenticateUser, authorizePermissions("user"), createReview);
router
  .route("/id")
  .get(getSingleReview)
  .patch(authenticateUser, authorizePermissions("user"), updateReview)
  .delete(authenticateUser, authorizePermissions("user"), deleteReview);

export default router;
