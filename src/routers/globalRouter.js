import express from "express";
import { join, login } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
// search페이지는 globalRouter에 있는게 맞다.
// search 페이지 구현을 위해, Router, Controller를 수정하였다.
globalRouter.get("/search", search);

export default globalRouter;