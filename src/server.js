import express from "express";
import { handle } from "express/lib/application";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use(logger);

// 라우터(ROUTER) 생성!
const globalRouter = express.Router();
const handleHome = (req, res) => res.send("Home");

// 서버가 GET request에 응답할 수 있도록
globalRouter.get("/", handleHome);

const userRouter = express.Router();
const handleEditUser = (req, res) => res.send("Edit User");

// 서버가 GET request에 응답할 수 있도록
userRouter.get("/edit", handleEditUser);

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("Watch Video");

// 서버가 GET request에 응답할 수 있도록
videoRouter.get("/watch", handleWatchVideo);

// 라우터(ROUTER) 사용!
app.use("/", globalRouter);

// 설명
// 누군가 /videos로 시작하는 url에 접근하면, videoRouter에 있는 Controller 찾음
// 현재 videoRouter엔 1개의 /watch url이 존재한다.

// 누군가 /videos로 시작하는 url에 접근하면, Express는 videoRouter안으로 들어간다.
// 현재 videoRouter가 GET Request에 대응할 수 있는 url은 /watch 하나뿐이므로,
// videoRouter는 /videos/watch로 안내하게 된다.
// 그 후 Express는 handleWatchVideo 함수를 실행한다.
app.use("/videos", videoRouter);
app.use("/users", userRouter);


app.listen(PORT, () => console.log(`✔ Server listening on port http://localhost:${PORT} 🚀`));

