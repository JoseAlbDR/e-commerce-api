import express from "express";
import authenticationMiddleware from "../middleware/authentication";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController";

const router = express.Router();

router.route("/").get(authenticationMiddleware, getAllUsers);

router.route("/showMe").get(authenticationMiddleware, showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(getSingleUser);

export default router;
