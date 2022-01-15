import mongoose from "mongoose";

// 잘 작동한다~
// console.log(process.env.COOKIE_SECRET);
// console.log(process.env.DB_URL);
// 여기서는 COOKIE_SECRETE과 DB_URL이 undefined로 나옴
// 이유는 require("dotenv")를 가장 먼저 실행하지 않아서 그런것
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
const handleOpen = () => console.log("✔ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
