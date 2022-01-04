import express from "express";
import join from "../controllers/userController";
import trending from "../controllers/videoController";

// GLOBALROUTER 생성
const globalRouter = express.Router();

// GET method 구현
globalRouter.get("/", trending);
globalRouter.get("/join", join);

export default globalRouter;