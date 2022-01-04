import express from "express";

// middlewars는 request와 response사이에 존재.
// (기억) 모든 middlewars(Controllers)는 handler고 모든 handler는 middleware(Controllers)다
// 지금부터 handler대신 controller라고 용어 사용 (MVC)
// middleware는 작업을 다음 함수에게 넘기는 함수. 응답하는 함수가 아님. Not response.
// middleware는 필요한 만큼 만들 수 있음.

const PORT = 4000;
const app = express();
//middleware도 request, response, next가 필요!
const gossipMiddleware = (req, res, next) => {
  // 어디로 가는지 알려주는 middleware
  console.log(`Someone is going to: ${req.url}`);
  next();
}

// 원래 controller에는 req, res 말고 next라는 argument가 있다.
// next argument는 next function을 호출해준다.
const handleHome = (req, res, next) => {
  // next();
  // cannot get /
  // app.get("/", handleHome) 다음에 함수가 없으므로, 접속 자체가 안되는 것이다.
  // next() 를 사용할 수 있게 middleware를 만들어보자

  // 여기서 handleHomer은 return 하니까, final function
  return res.send("I love middlewares");
}

const handleLogin = (req, res) => {
  return res.send({message: "Login here."});
}

// 함수의 signature. app.get은 url을 먼저 요청(require)하고, 그 다음 handler를 호출한다.
// 다수의 handlers 사용 가능!
app.get("/", gossipMiddleware, handleHome);

// 모든 controller는 middleware가 될 수 있다.
// 함수가 next() (함수)를 호출한다면, 함수는 middleware라는 것을 의미한다.


// app.get("/login", handleLogin);


app.listen(PORT, () => console.log(`✔ Server listening on port ${PORT} 🚀`));

