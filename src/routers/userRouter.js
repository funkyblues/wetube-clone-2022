import express from "express";

// USERROUTER 생성
const userRouter = express.Router();

// GET method 구현
userRouter.get("/edit", handleEdit);
userRouter.get("/delete", handleDelete);

export default userRouter;