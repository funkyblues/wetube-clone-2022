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
app.use("/videos", videoRouter);
app.use("/users", userRouter);


app.listen(PORT, () => console.log(`✔ Server listening on port http://localhost:${PORT} 🚀`));

