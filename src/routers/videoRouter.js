import express from "express";
import { get } from "express/lib/response";
import { watch, getEdit, postEdit, getUpload, postUpload } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
// videoRouter.get("/upload", getUpload);
// videoRouter.post("/upload", postUpload);
// 이렇게 써도 됨!
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;