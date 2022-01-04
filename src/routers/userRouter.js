import express from "express";
import { edit, remove } from "../controllers/userController"
// USERROUTER 생성
const userRouter = express.Router();

// GET method 구현
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);

export default userRouter;