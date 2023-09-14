import express from "express";
import { createOrder, deleteOrder, getUserOrder } from "../controllers/order.js";
const router = express.Router();

router.post("/create-order",createOrder);
router.get("/user-orders/:userId",getUserOrder);
router.delete("/delete-order/:orderId",deleteOrder);

export default router;
