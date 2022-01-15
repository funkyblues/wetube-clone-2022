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

// 이 middleware는 브라우저가 우리의 벡앤드와 상호작용 할 때 마다 브라우저에 cookie를 전송
// 브라우저는 cookie로 뭘 할지, 어디에 넣을지 모든걸 알고 있음.

// cookie는 벡엔드가 나의 브라우저에 주는 정보. cookie에는 정해진 규칙이 있기 때문에 매번 backend에 request를 할 때,
// 브라우저는 알아서 request에 cookie를 덧붙이게 됨.

// cookie에는 무슨 정보가 들어갈까? 
// 어떤 정보든 넣을 수 있는데, 우리가 넣을 것은 session ID이다.
// 왜냐면 브라우저와 backend와의 연결이 평생 보장된 것은 없기 때문.
// 브라우저와 backend간의 연결은 render가 끝나거나, redirect가 발생하거나, 우리가 post request를 보내거나 응답없음을 받으면 connection은 바로 끝난다.
// 그래서 우리는 사용자에게 session ID를 주는것. 이 ID를 넣을 곳은 바로 cookie!

// cookie랑 session은 별개의 개념.
// cookie는 단지 backend, frontend간의 정보를 주고받는 방법. 자동적으로 처리되기 때문에 아주 좋음
// session ID는 cookie 에 저장된다. 왜냐면 cookie는 session ID를 전송하는데 사용되기 때문.
// 중요한 건 session ID가 cookie안에 저장되고 backend에도 저장된다는 점.

// backend는 생성된 모든 session ID를 관리하는 곳이다.
// 만약 4명의 사용자가 있다면, session store에 4개의 session이 있는 것.
// session store: 우리가 session을 저장하는 곳. 매번 코드를 저장하면 서버가 재시작되는데 그러면 session store가 초기화됨.
// 다음 영상에서 cookie store를 mongodb와 연결할 것임.

app.use(
  session({
    secret: "Hello!", 
    resave: true,
    saveUninitialized: true,
  })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
