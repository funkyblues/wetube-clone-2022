import express from "express";

const PORT = 4000;

const app = express();

// express의 route handler는 event는 없지만, 2개의 object를 받을 수 있다.
// req, res. -> express로 부터 받은 것

const handleHome = (req, res) => {
  // console.log(req);
  // console.log(res);


  // request를 종료하는 방법 중 하나!
  // return res.end(); // return으로 함수가 종료되어서 request를 종료!

  // 다른 방법
  // 서버가 res에 send 메서드를 활용하여 메시지 보냄
  return res.send("I still love you");
}

const handleLogin = (req, res) => {
  return res.send("Login here.");
}

app.get("/", handleHome);
app.get("/login", handleLogin);


app.listen(PORT, () => console.log(`✔ Server listening on port ${PORT} 🚀`));

