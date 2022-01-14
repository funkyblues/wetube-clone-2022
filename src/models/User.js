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
// User model을 만들자.
const User = mongoose.model("User", userSchema);

export default User;