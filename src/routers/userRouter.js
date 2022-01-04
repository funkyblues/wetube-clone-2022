import express from "express";

// USERROUTER 생성
const userRouter = express.Router();

// handler(controller) 정의
const handleEdit = (req, res) => res.send("Edit User");
const handleDelete = (req, res) => res.send("Delete User");

// GET method 구현
userRouter.get("/edit", handleEdit);
userRouter.get("/delete", handleDelete);

export default userRouter;