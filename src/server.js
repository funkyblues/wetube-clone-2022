import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended:true }));

// express-session을 router 앞에서 초기화해주면 된다.
app.use(session({
  secret: "Hello!", //나중에는 이 secret을 아무도 모르는 문자열로 쓸 것임!
  resave: true,
  saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  })
});
// 서버를 저장하고 재시작하면 세션이 사라지게 된다. 왜냐면 express가 세션을 메모리에 저장하고 있기 때문.
// 마치 우리가 fake DB를 만들었을 때 처럼 세션도 그렇게 되고 있는 것.

// 나중에 벡엔드가 잊지 않도록 세션을 mongoDB와 연결해볼 것이다.
// 벡엔드는 쿠키를 가지고 어떻게 브라우저를 구분?

// 이전 영상에서 벡엔드가 브라우저에게 우리가 이해할 수 없는 텍스트를 보내는 것을 봤다.
// 그런데 그 텍스트가 벡엔드에선 세션 id로 사용되고 있었다.
// 그 의미는 벡엔드의 메모리에 세션을 저장할 수 있는 DB가 생겼다는 의미. 벡엔드의 각 세션들은 id를 갖고 있다.
// 서버는 이 id를 브라우저에게 보냄. 그러면 브라우저가 요청을 보낼 때 마다 그 id를 같이 줘서
// 그러면 서버는 브라우저와 일치하는 세션이 뭔지 알 수 있게 된다.

// 그리고 세션 id를 가지고 있으면 세션 object에 정보를 추가할 수 있다!!
// console.log(sessions)에 벡엔드에 등록된 세션이 나타난다.
// 그 말은, 이제 세션을 저장할 수 있는 DB가 생겼다는 뜻. 세션의 정보를 이 DB에 저장할 수 있다.


// 이 코드는 크롬의 session id를 출력해주는 웹페이지로 안내한다.

// app.get("/add-one", (req, res, next) => {
//   return res.send(`${req.session.id}`);
// })

// counter를 만들어보자
// 처음엔 NaN이지만, 새로고침을 계속하면 1씩 증가한다.
app.get("/add-one", (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id}\n${req.session.potato}`);
})



/*정리
서버가 브라우저에게 세션 id를 주고있음 그럼 브라우저가 쿠키에 그 세션 id를 저장하고, express에서도 그 세션을 세션 DB에 저장한다.
세션 DB에 있는 id와 브라우저의 쿠키에 있는 id가 같도록!!
매 순간 브라우저가 요청을 보낼 때 마다 쿠키에서 세션 id를 가져와 전달해 주게 된다.
그러면 서버가 세션 id를 벡엔드 세션 DB에서 읽고 우리가 누군지 알 수 있는 것이다.
그렇게 되면 서버가 브라우저에 보내서 브라우저가 쿠키에 저장한 세션 id를 
(일단은) localhost:4001의 모든 url에 요청을 보낼 때 마다 세션 id를 요청과 함께 보내게 된다.
그러면 벡엔드에서 어떤 유저가, 어떤 부라우저에서 요청을 보냈는지 알 수 있게 된다!*/



app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;