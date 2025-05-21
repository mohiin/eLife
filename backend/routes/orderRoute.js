
import express from "express";
import { orders, placeOrder, userOrders, verifySession } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.get("/verify", verifySession);
orderRouter.get("/user/:userId", userOrders);
orderRouter.get("/admin/:adminId", orders);

export default orderRouter;