import express from "express";

const PORT = 4000;

const app = express();

// const handleHome = () => ... 이렇게 작성해 주어도 된당. 밑에 callback엔 함수이름 적어주공.

// 브라우저가 서버에게 get request를 보내고 있는 상황(요청).
// 서버는 get request에 반응할 수 있다 -> cannot GET / 이 더이상 뜨지 않음!
// 브라우저는 서버에게 "/" url을 요청함
// 그러면 서버는 화살표 함수를 보내주는 것.
app.get("/", () => console.log("Somebody is trying to go home."));

app.listen(PORT, () => console.log(`✔ Server listening on port ${PORT} 🚀`));

