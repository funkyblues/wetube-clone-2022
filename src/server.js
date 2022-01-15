import express from "express";
import morgan from "morgan";
import session from "express-session";
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
  })
);

// 접속하는 모든 사람을 보고싶진 않기 때문에, 이제 이 middleware는 지우자.
//   // // response object를 잠깐 살펴보자.
//   // // console.log(res);
//   // // 우리가 지금 관심있는 것은 locals!
//   // // 왜냐면 pug template에서 locals object 에 접근할 수 있기 때문이지! (pug와 express가 서로 locasl를 공유할 수 있도록 되어 있기 때문)
//   // // 한번 확인해보자.
//   // res.locals.sexy = "you";
//   // // 베리귯!
//   // res.locals.siteName = "Wetube";
//   // 이것을 middlewares.js에 저장할 것이다.
//   // 필요 없게 된 것.
//   req.sessionStore.all((error, sessions) => {
//     console.log(sessions);
//     next();
//   })
// });

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
