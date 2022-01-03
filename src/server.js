// "express"라는 package를 express 라는 이름으로 import!
// 이렇게 입력하면, node_modules에서 express를 찾고 있는것을 알려줌
// express를 찾고 그것의 index.js를 불러오게 된다!
import express from "express";

const PORT = 4000;

// express()를 선언하면 express app을 만들어 줌
const app = express();

// const handleListening = () =>console.log(`✔ Server listening on port ${PORT} 🚀`);


//app.listen() 안에 들어가는 callback은 서버가 시작될 때 작동하는 함수!
// callback을 작성하기 전에, 서버에게 어떤 port를 listening할 지 알려주어야 하마.
// port는 컴퓨터의 문, 창문 같은 것. 인터넷과 연결되어 있다.
// app.listen(4000, handleListening);

// 이렇게도 작성할 수 있다!
app.listen(PORT, () => console.log(`✔ Server listening on port ${PORT} 🚀`));

// 보통 서버를 시작했다면 localhost를 통해 접근 가능!
// nodemon을 종료시키면, localhost:4000 은 열리지 않는다. 서버가 실행되었다가 종료되었다는 뜻.


// GET은 HTTP method 무슨말일까 (get this page)
// HTTP: 서버와 소통하는 방법. 서버끼리 소통하는 방법
// http request : 웹사이트에 접속하고 서버에 정보를 보내는 방법
// 아무것도 안했지만 브라우저는 자동으로 페이지를 get하려 함



// 웹사이트에 접속할 때 브라우저는 웹사이트를 request하고 페이지를 가져다준다.
// 누군가 GET을 요청하면 server는 어떻게 해야하는가? 