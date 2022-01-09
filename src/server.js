// 파일 그 자체를 import!!
// server.js가 이 라인을 보는 순간, import해줌으로써 mongo에 연결 될 것.

// 그러나 서버가 시작되고 난 후 database에 연결된다.
// 이유는 database가 더 느리기 떄문?
import "./db";

import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";


const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended:true }));

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


app.listen(PORT, () => console.log(`✔ Server listening on port http://localhost:${PORT} 🚀`));

