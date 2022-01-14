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
// 이제 이 middleware가 사이트로 들어오는 모두를 기억하게 될 것임
// 로그인 하지 않았어도 기억하게 될거여. 들어온 사람에겐 텍스트를 주고 텍스트로 유저가 누구인지 알아낼 것이여.

// 새로고침을 하면 브라우저가 우리 서버에 요청을 보내고, 
// 서버에서는 session middleware가 브라우저에게 텍스트를 보낼 것이다.
// 그렇게 함으로써 서버가 브라우저를 개별적으로 기억할 수 있도록 만들 것임.

// 브라우저에서 새로고침을 할 때마다, 벡엔드(localhost)에 요청을 보낼 때 마다,
// 텍스트가 알아서 벡엔드로 보내질 것임. (브라우저가 알아서 벡엔드로 쿠키를 보내도록 되어 있기 때문!)
// 이 쿠키로는 무엇을 할 수 있을까??

// 미들웨어를 만들면서 한번 이해해 보자.
// 이렇게 했을 때 쿠키가 어떻게 나오는지 봅시다.
// 벡엔드에서 쿠키가 보인다! 이 쿠키는 정말 쓸모가 있을 거야.

app.use((req, res, next) => {
  console.log(req.headers);
  next();
})

// 근데 브라우저에서 보내는 이 이상한 텍스트는 무슨 내용인건가??
// 이를 위한 다른 미들웨어를 만들어보자

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  })
});

// 이제 콘솔에 나오는것은 벡엔드가 기억하고 있는 sessions를 console.log한 걸 보게 될 것이다.
// 처음 새로고침 때는 아무것도 출력하지 않았지만,
// 그 다음 새로고침 때는 벡엔드가 어떤 유저를 기억하고 있다.
// 이것은, 우리가 사용하는 브라우저에서 우리의 id가 이것이라는 것으로 보인다.
// 진짜인지 확인해보자.
// brave, chrome에서 각각 localhost에 요청하면, 벡엔드는 누가 자기에게 요청을 했는지 각각 기억하고 있게 된다.
// 그러니까 위에 상황에서는, 세션이 2개 인거지.
// 이게 바로 벡엔드가 id를 통해서 기억하는 방식.

// 다음 시간엔 세션에 기반하여 프론트엔드에 내용 표시하는 것을 배울 것....

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

// 이번에 할 것 : 유저를 기억하게 만들어 보는 걸 할 것임.
// 유저를 기억하는 방법 중 한가지는 유저에게 쿠키를 보내는 것임. (쿠키를 이해하기 위해서는 세션에 대한 개념이 필요하다.)
// Session(세션) : 벡엔드와 브라우저(프론트엔드)간에 어떤 활동을 했는지 기억하는 것을 의미.
// ex.지금 노마드코더에 로그인되어 있다면 사용하는 브라우저와 벡엔드 사이에 세션이 존재하는 것임.
// 일정시간 후에는 이 세션이 없어질 것임. 그러면 다시 연결을 해줘야 하는 거지.

// 세션은 브라우저와 벡엔드 사이의 memory, history와 같은 것. 이것이 작동하려면 벡엔드와 브라우저가 서로에 대한 정보를 갖고 있어야 한다.
// 왜냐면 이 로그인 페이지에서 HTTP request를 하면, 요청이 처리되고 끝나게 되는데, 그 이후로는 벡엔드가 아무것도 할 수가 없게 된다.
// 브라우저가 Home 화면으로 이동하면 GET요청을 보내게 되는데, 벡엔드가 HTML을 render하고 나면 연결이 끊기게 되는 것임.
// 계속 연결이 유지되지 않는다. 요청을 받고 처리를 끝내면 서버에서는 누가 요청을 보냈는지 잊어버린다.
// 브라우저도 마찬가지로 잊게 된다. 서버가 더이상 필요 없으니.

// 이를 Stateless(무상태)라고 부른다. 
// 한 번 연결되었다가 끝나는 것. 둘 사이 연결에 state가 없어지게 되는 것이다.

// 그래서 우리는 유저에게 어떤 정보를 남겨줘야 한다. 유저가 벡엔드에 뭔가 요청할 때 마다 누가 요청하는지 알 수 있도록!!
// 유저가 로그인을 하면 서버는 조그마한 텍스트 같은 것을 주게 된다.
// 그 후 유저가 우리에게 요청을 보낼 때 마다 텍스트를 같이 보내달라고 하게 되는 것.

// 중요한 건 유저가 로그인 할 때 유저에게 특정 텍스트를 준다는 것임!!!