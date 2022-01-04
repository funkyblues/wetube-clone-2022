import express from "express";
import { watch, edit } from "../controllers/videoController";

// VIDEOROUTER 생성
const videoRouter = express.Router();

// GET method 구현
videoRouter.get("/watch", watch);
videoRouter.get("/edit", edit);

export default videoRouter;