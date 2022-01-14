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

  // 이제 유저가 로그인하고 싶을 때 어떻게 패스워드 일치 여부를 확인할 수 있을까?
  // 일단 보류. 나중에 배우게 될거다. ㅋㅋ

  // 만약 누군가 이미 사용하고 있는 email로 계정생성을 하려고 한다면?
  // 또는 같은 username으로 생성하려 한다면??

  // 계속 로딩중이다가, 에러가 뜸
  // 이미 존재하는 데이터를 저장하기 때문에 생기는 error...
  // DB는 잘 인식하고 우리에게 보여주고 있지만, 우리가 직접 error를 체크해주어야 한다.
  // DB가 error를 보여주는 것 대신에, DB에서 에러가 보이지 않게 해주자.
  // 에러가 발생하면 DB에 저장하기 전에 catch할 것.
  // DB에서 에러가 발생하는 건 최후의 상황에서만 보여줄 것임.

  // 코드에서 체크할 수 있도록.....



  console.log("Hashed password:", this.password);
});

// User model을 만들자. 
const User = mongoose.model("User", userSchema);

export default User;