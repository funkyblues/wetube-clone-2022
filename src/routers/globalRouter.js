import express from "express";
// export default로 할 땐, 파일은 한가지 default export 밖에 가질 수 없으므로
// nodejs 는 그 파일의 default를 알기 때문에 사용자가 원하는 어느 이름으로든 바꿀 수 있음.
// 그러나 각각 변수를 export 하게되면 실제 이름을 그대로 사용해야 한다.
// ex. edit, trending, watch...
import { join } from "../controllers/userController";
import { trending } from "../controllers/videoController";

// GLOBALROUTER 생성
const globalRouter = express.Router();

// GET method 구현
globalRouter.get("/", trending);
globalRouter.get("/join", join);

export default globalRouter;