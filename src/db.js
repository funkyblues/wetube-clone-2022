import mongoose from "mongoose";

// mongo 실행 후 나오는 url 뒤에 db이름 적어주면 됨!
mongoose.connect("mongodb://127.0.0.1:27017/wetube");

// 서버와 database 서버 사이의 connection.
const db = mongoose.connection;
const handleOpen = () => console.log("✔ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);
// connection에 event listener 추가.

// on과 once의 차이점은 on은 여러번 계속 발생시킬 수 있음. ex.클릭같은 이벤트.
// once는 오로지 한번만 발생한다는 뜻.

// "error" event
// db.once("error", (error) => console.log("DB Error", error));
// db 연결에 error가 뜬다면, DB Error를 호출. 
db.on("error", handleError);
// 연결이 잘 되었을 때.
db.once("open", handleOpen);
