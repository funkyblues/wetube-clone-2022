import express from "express";

const PORT = 4000;
const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  // url이 /protected라는 걸 확인하면 Not Allowed를 호출!
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("Allowed, you may continue.");
  next();
}

const handleHome = (req, res, next) => {
  return res.send("I love middlewares");
}
// app.use()는 global middleware를 만들 수 있게 해줌.
// 어느(Any) URL에도 작동하는 middleware
// 그러기 위해서는 middleware를 먼저 use하고 그 다음에 URL의 get이 와야함

// 사용해보면 알겠지만... 모든 route에서 이 함수를 사용!
// 위치를 바꾸게 되면? -> middleware가 맨 처음에 작동하지 않게 됨.
// 주소 입력하면 작동하긴 함. -> 결론적으로 순서가 중요.
// middleware를 위에 두면 모든 route에 적용!

// Final function이므로 next argument는 필요없다.
const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge.");
}

app.use(logger);
//
app.use(privateMiddleware);
app.get("/", handleHome);

// protected rout 생성
// /protected 페이지로 가면, logger가 GET /URL을 보내주고, 
// privateMiddleware를 거치면서 거기서 멈춘 것.
app.get("/protected", handleProtected);

// 기억 
// 모든 함수는 middleware나 controller 가 될 수 있음.
// 함수가 next()를 호출하면, middleware임. 호출 안하면 아님.
// middleware는 왼쪽에서 오른쪽으로




app.listen(PORT, () => console.log(`✔ Server listening on port ${PORT} 🚀`));

