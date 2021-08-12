import express from "express";
const router = express.Router();
import {
  authUser,
  userProfile,
  registerUser,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, userProfile);

export default router;
