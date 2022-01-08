import express from "express";
import { watch, getEdit, postEdit, upload, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
// handler를 붙여주는 방식으로 적용하면 간단하게 코드 작성 가능.
// 하나의 url에 get, post 방식을 쓰도록 할 때 아주 유용.
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

// 이제 우리 서버는 post를 이해하게 된 것.
videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", upload);

export default videoRouter;