import bcrypt from "bcrypt";
import mongoose from "mongoose";

// User Schema 생성
const userSchema = new mongoose.Schema({
  // unique추가. email과 username은 딱 하나 존재하도록.
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required:true },
  name: { type:String, required: true },
  location: String,

})

// User 모델 만들기 전에 pre("save") 실행!
userSchema.pre("save", async function() {
  console.log("Users password:", this.password);
  // 이 함수 안에서 this는 저장되는 User를 의미한다.
  // 그러므로 this.password는 User의 password를 의미.
  this.password = await bcrypt.hash(this.password, 5);

  // 이젠 encrypted된 password를 사용한다!!!
  // 개멋져
  console.log("Hashed password:", this.password);
});

// User model을 만들자. 
const User = mongoose.model("User", userSchema);

export default User;