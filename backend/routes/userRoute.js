import express from "express";
const router = express.Router();
import {
  authUser,
  userProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controller/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, userProfile);
router.put("/profile", protect, updateUserProfile);
//admin routes
router.get("/", protect, isAdmin, getUsers);
router.delete("/:id", protect, isAdmin, deleteUser);
router.get("/:id", protect, isAdmin, getUserById);
router.put("/:id", protect, isAdmin, updateUser);

export default router;
