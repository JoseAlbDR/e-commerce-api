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

router.route("/").get(getAllUsers);

router.route("/showMe").get(authenticationMiddleware, showCurrentUser);
router.route("/updateUser").post(updateUser);
router.route("/updateUserPassword").post(updateUserPassword);

router.route("/:id").get(getSingleUser);

export default router;
