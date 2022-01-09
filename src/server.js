import "./db";
import "./models/Video";
// 이 연결로 db는 우리 video model을 인지!
// db를 mongoose와 연결시켜서 video model을 인식시키게 됨.

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

