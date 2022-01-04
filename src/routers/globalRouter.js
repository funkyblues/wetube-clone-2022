import express from "express";

// GLOBALROUTER 생성
const globalRouter = express.Router();

// handler(controller) 정의
const handleHome = (req, res) => res.send("Home");
const handleJoin = (req, res) => res.send("Join");

// GET method 구현
globalRouter.get("/", handleHome);
globalRouter.get("/join", handleJoin);

export default globalRouter;