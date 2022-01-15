// require("dotenv").config();
// 이런식으로 작성하면 계속 에러가 발생한다. 왜냐면 이렇게 하는거는 .env파일의 변수들을 사용하려는 파일에 
// 다 require를 적어줘야 하기 때문. 그리고 그건 번거로움.
// import 방식으로 수정

// (참조) https://kwoncheol.me/posts/dotenv-and-module
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";



const PORT = 4001;
app.listen(PORT, () => console.log(`✔ Server listening on port http://localhost:${PORT} 🚀`));
