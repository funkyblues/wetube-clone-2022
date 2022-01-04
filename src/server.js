import express from "express";

const PORT = 4000;

const app = express();

// const handleHome = () => ... 이렇게 작성해 주어도 된당. 밑에 callback엔 함수이름 적어주공.

// 브라우저가 서버에게 get request를 보내고 있는 상황.
// 서버는 get request에 반응할 수 있다
app.get("/", () => console.log("Somebody is trying to go home."));

app.listen(PORT, () => console.log(`✔ Server listening on port ${PORT} 🚀`));

