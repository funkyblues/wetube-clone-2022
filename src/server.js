import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended:true }));

app.use(
  session({
    secret: "Hello!", 
    resave: true,
    saveUninitialized: true,
    // 이제 우리의 세션들은 MongoDB database에 저장되게 된다.
    // 세션은 어떻게 만들어질까? -> 브라우저가 우리의 backend를 방문할 때 만들어진다.
    // 새로고침하면 만들어져 있다. 2주동안 기억하겠다는 내용의 expires요소도 있따.
    // 로그인을 하면, 이미 있던 session에 사용자 정보가 들어간다.

    // 그럼 backend를 껐다가 켜면 어떻게 될까. 똑같지.
    // 여전히 로그인된 상태로 있다. 로그인 정보는 이제 mongodb에 있기 때문이다.
    // store: MongoStore 덕분에 mongodb storage에 사용자 세션을 저장하게 되는 것.

    // 이 부분을 없애면 session은 서버의 메모리에 저장된다. 그러면 서버를 재시작할 때 마다 메모리가 지워지므로 세션들을 database안에 저장하도록 한 것이다.
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/wetube"
    }),
  })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
