import express from "express";

const PORT = 4000;

const app = express();

// express의 route handler는 event는 없지만, 2개의 object를 받을 수 있다.
// req, res. -> express로 부터 받은 것

const handleHome = (req, res) => {
  return res.send("<h1>I still love you.</h1>");
}

const handleLogin = (req, res) => {
  // JSON 형식으로 보내줄 수도 있다 ㅋㅋ
  // 응답은 필수. 응답하지 않으면 브라우저는 계속 기다림 (아니면 포기)
  return res.send({message: "Login here."});
}

app.get("/", handleHome);
app.get("/login", handleLogin);


app.listen(PORT, () => console.log(`✔ Server listening on port ${PORT} 🚀`));

