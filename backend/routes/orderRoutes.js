import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controller/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

//admin route
router.get("/", protect, isAdmin, getOrders);
router.put("/:id/deliver", protect, isAdmin, updateOrderToDelivered);

export default router;
