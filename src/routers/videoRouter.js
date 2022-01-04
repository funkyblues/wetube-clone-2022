import express from "express";

// VIDEOROUTER 생성
const videoRouter = express.Router();

// GET method 구현
videoRouter.get("/watch", handleWatch);
videoRouter.get("/edit", handleEdit);

export default videoRouter;