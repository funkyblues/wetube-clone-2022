import express from "express";

// USERROUTER 생성
const userRouter = express.Router();

// handler(controller) 정의
const handleEditUser = (req, res) => res.send("Edit User");

// GET method 구현
userRouter.get("/edit", handleEditUser);

export default userRouter;