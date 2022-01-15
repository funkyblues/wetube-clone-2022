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
    // resave와 saveUninitialize의 차이점을 알아보자. 
    // 그리고 이것들을 false로 바꾸는 것에 대해 알아보자.
    // session authentication을 사용하면서 생길 수 있는 문제에 대해 배울 수 있기 때문.

    // 방문한 모든 사람들의 session을 DB에 모두 저장하는데, 그것은 좋은 생각이 아니다.
    // 아마 로그인한 사용자의 session만 저장하는 것이 좋을 것.
    // 서버는 로그인 하지 않으면 쿠키를 주지 않고 로그인 하면 쿠키를 넘겨주는 걸로 할 거다.

    // resave랑 saveUninitialized를 false로 해보자.
    // 그러면 이제 sessions db엔 세션이 저장되지 않는다.
    // uninitialized: 세션이 새로 만들어지고 수정된 적이 없을 때를 말함.

    // 세션은 어디서 수정할까? -> userController에서!!
    resave: false,
    saveUninitialized: false,
    // resave, saveUninitialized: false가 하는 것은, 세션을 수정할 때만 세션을 DB에 저장하고 
    // 쿠키를 넘겨주는 것. 우리는 로그인 할 때만 세션을 수정하고 있따.
    // 다시 말하자면, backend가 로그인한 사용자에게만 쿠키를 주도록 설정되었다는 의미!

    // 안드로이드 앱이나 iOS앱을 만들 때 얘내들은 쿠키를 갖지 않기 때문에 token을 사용한다.
    // 하지만 여기선 브라우저에서 인증을 하니까 쿠키를 이용한 세션인증을 할 수 있다.

    // (물론 브라우저에서 token을 사용해도 되지만 이는 심화내용이라 별개의 공부를 해야함(강의))

    // 이제 우리는 기억하고 싶은 사람들에게만 쿠키를 주게 된다. 바로 우리 유저.
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
