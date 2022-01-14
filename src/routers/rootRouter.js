import express from "express";
import { getJoin, postJoin, login } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

// globalRouter보다는 rootRouter가 더 맞는 이름인 것 같다.
const rootRouter = express.Router();

rootRouter.get("/", home);
// 우리는 결국 /join으로 들어가면 POST요청을 보낼 것이란 걸 알고 있다.
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
// search페이지는 globalRouter에 있는게 맞다.
// search 페이지 구현을 위해, Router, Controller를 수정하였다.
rootRouter.get("/search", search);

export default rootRouter;