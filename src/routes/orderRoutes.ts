import express from "express";
import {
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  updateOrder,
} from "../controllers/orderController";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders)
  .post(authenticateUser, createOrder);

router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);

router
  .route("/:id")
  .post(authenticateUser, createOrder)
  .patch(authenticateUser, updateOrder);

export default router;
