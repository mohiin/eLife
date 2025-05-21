
import express from "express";
import { addToCart, getCartData, removeFromCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.delete("/delete", removeFromCart);
cartRouter.get("/get/:userId", getCartData);

export default cartRouter;