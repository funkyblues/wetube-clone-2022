import express from "express";
import { see, edit, upload, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
// :id는 parameter라고 불림. :이 무조건 필요. (argument, variable 등으로도 불린대 ㅋ 이름 기억 ㄴㄴ)
// 포인트는 이걸로 url 안에 변수를 포함시킬 수 있음.
// 이렇게 표시하는 건, express에게 이것이 변수라는 것을 알려주기 위함!
// 이것을 코드에서 어떻게 엑세스 하는지 see 함수를 통해 설명.

// 왜 :id보다 upload를 위에 뒀을까?
// :id를 밑에 두면....? (express의 request는 제일 위의 것을 먼저 보게 된다.)
// express는 :id가 있는 자리에 upload가 있으니 그걸 id라고 생각하게 된다.

// express에게 id가 숫자여야 한다고 말 할수 있을까?
videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;