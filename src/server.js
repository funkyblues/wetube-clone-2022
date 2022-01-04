// Router와 Controller는 섞으면 안좋음
// Controller는 함수이기 때문! Router는 함수를 이용하는 입장.
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";


const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use(logger);


app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


app.listen(PORT, () => console.log(`✔ Server listening on port http://localhost:${PORT} 🚀`));

