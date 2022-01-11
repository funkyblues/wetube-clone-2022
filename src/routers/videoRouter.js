import express from "express";
import { get } from "express/lib/response";
import { watch, getEdit, postEdit, getUpload, postUpload } from "../controllers/videoController";

const videoRouter = express.Router();

// mongodb와 mongoose에서 제공하는 id는 16진수로 이루어진 24자리 id.
// 정규표현식, regular expression을 사용해서 express가 이 id를 인식할 수 있도록 하자!
// [0-9a-f]{24}

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;