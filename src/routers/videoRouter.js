import express from "express";

// VIDEOROUTER 생성
const videoRouter = express.Router();

// handler(controller) 정의
const handleWatch = (req, res) => res.send("Watch Video");
const handleEdit = (req, res) => res.send("Edit Video");

// GET method 구현
videoRouter.get("/watch", handleWatch);
videoRouter.get("/edit", handleEdit);

export default videoRouter;