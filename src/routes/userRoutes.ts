import express from "express";
import {
  getAllUsers,
  // showCurrentUser,
  // getSingleUser,
  // updateUser,
  // updateUserPassword,
} from "../controllers/userController";

const router = express.Router();

router.route("/").get(getAllUsers);

export default router;
