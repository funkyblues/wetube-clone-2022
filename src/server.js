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
// 또 한번 설명.
// 만약 서버가 /users/edit라는 URL을 보게 되면, userRouter를 실행하게 된다.
// 그 후 userRouter 안에서 /edit을 찾게 된다.
app.use("/users", userRouter);


app.listen(PORT, () => console.log(`✔ Server listening on port http://localhost:${PORT} 🚀`));

