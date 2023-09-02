import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/authController";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/logout", logoutController);

export default router;
