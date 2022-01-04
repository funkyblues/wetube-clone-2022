import express from "express";
import { see, edit, upload, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
// express에게 id가 숫자여야 한다고 말 할수 있을까?

// REGEX 함.
// /(nico\w+)/g -> nico로 시작하는 단어 모두 get! (w는 아무 문자 의미) (nicolas, nicomano)
// Hello my name is nicolas and im 58, my name is also nicomano

// /(\d+)/g (d는 digit) 숫자만 get! (12, 22)
// /videos/12
// /videos/lalalalalla
// /videos/hello
// /videos/22

// 오 ㄹㅇ임 ㅋㅋㅋ 이젠 upload가 어디에 가든 상관이 없게되었음.
// 그러나 우리의 DB가 이런 형식이 아니기 때문에, 이걸 쓰지는 않을 것.

// 결론적으로 할 수 있다. id를 이용해서 req.params.id로 불러와야하기 떄문에, id를 남겨둠.
videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;