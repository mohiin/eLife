
import express from "express";
import { currentUser, loginUser, register } from "../controllers/userController.js";
import authenticate from "../middleware/middleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", loginUser);
userRouter.get("/me", authenticate, currentUser);

export default userRouter;