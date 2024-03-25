import express from "express";
import { addUser, signInUser } from "../controller/user.controller.mjs";

const userRouter = express.Router();

userRouter.post("/add-user", addUser);
userRouter.post("/login", signInUser);

export default userRouter;
