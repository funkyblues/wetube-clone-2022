import express from "express";

// VIDEOROUTER 생성
const videoRouter = express.Router();

// handler(controller) 정의
const handleWatchVideo = (req, res) => res.send("Watch Video");

// GET method 구현
videoRouter.get("/watch", handleWatchVideo);

export default videoRouter;