import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
} from "../controller/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);

router.delete("/:id", protect, isAdmin, deleteProductById);

export default router;
