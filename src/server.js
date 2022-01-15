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



//undefined라고 뜬다.
console.log(process.env.COOKIE_SECRET);


app.use(
  session({
    // secret은 우리가 쿠키에 sign할 때 사용하는 string
    // 쿠키에 sign하는 이유: 우리 backend가 쿠키를 줬다는 것을 보여주기 위해
    // 왜냐면 session hijack이라는 공격유형이 있어서. 이걸 잘 보호해야 한다. 누군가 나의 쿠키를 훔칠 수 있기 때문이지.
    // 이 string을 가지고 쿠키를 sign하고 우리가 만든 것임을 증명할 수 있기 때문.
    // 쿠키의 Domain은 이 쿠키를 만든 backend가 누구인지를 알려줌.
    
    // 브라우저는 Domain에 따라 쿠키를 저장하도록 되어 있다. 그리고 쿠키는 Domain에 있는 backend에만 전달된다.
    // 그래서 우리가 어떤 요청을 하던 간에 쿠키가 localhost로 전송될 것이다. 
    // 그러니 내 쿠키는 localhost로만 갈 것이야 youtube, instagram 이런데로 안가는 거지 (브라우저가 이 규칙을 지킨다.)

    // Path는 그냥 경로(url)

    // Expires/Max-Age

    // 여길 보면 Session이라고 적혀있는데, 이 쿠키는 만료 날짜가 적혀있지 않은 것이다.
    // 만약 만료 날짜를 지정하지 않으면 이것은 Session cookie가 되고, 사용자가 닫으면 session cookie는 끝나게 된다.
    // 그러니 브라우저를 끄거나 컴퓨터를 재시작하면 세션이 사라지게 되는거지.
    
    // 이건 사용자가 닫지 않는 한 계속 살아있는 거임.

    // 그럼 Max-Age는??
    // 말 그대로 언제 세션이 만료되는지 알려주는 것. 근데 우리 mongodb의 session에도 exprires라는 속성이 있는데..??
    // 그래서 브라우저가 평생 켜져있거나 사용자가 브라우저를 계속 사용해도 db내의 session의 기한이 끝나면 사라진다.

    // 우리는 secret과 mongoUrl(DB url)을 보호해야 한다. 다른 사람들이 쓰면 안되거든
    // 이를 위해 environment file(환경변수)을 만들 것.
    // 이건 비밀파일이야
    secret: process.env.COOKIE_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 20000 // 20초후에 쿠키가 사라진다.
    },
    store: MongoStore.create({
      // .env에 접근하는 방법? process.env.DB_URL이렇게 써주면 됨.
      mongoUrl: process.env.DB_URL
    }),
  })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
