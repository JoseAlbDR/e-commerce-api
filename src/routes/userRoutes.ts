import express from "express";
import {
  getAllUsers,
  getSingleUser,
  // showCurrentUser,
  // getSingleUser,
  // updateUser,
  // updateUserPassword,
} from "../controllers/userController";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser);

export default router;
