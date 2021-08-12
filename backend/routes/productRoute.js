import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
} from "../controller/productController.js";

router.get("/", getProducts);

router.get("/:id", getProductById);

export default router;
