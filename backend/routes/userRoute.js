import express from "express";
const router = express.Router();
import {
  authUser,
  userProfile,
  registerUser,
  updateUserProfile,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, userProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
