import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";


const PORT = 4000;

const app = express();
const logger = morgan("dev");

// express 공식 문서 참조 API Reference
// express의 app의 기능을 활용하여 view engine을 pug로 사용하겠다는 의미.
// 기본적으로 express는 view 폴더 안에 있는 파일을 찾음.
// views : app의 뷰에 대한 디렉토리나 배열을 담고 있음. 
// 뷰, html, 텍스트는 같은거.
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


app.listen(PORT, () => console.log(`✔ Server listening on port http://localhost:${PORT} 🚀`));

