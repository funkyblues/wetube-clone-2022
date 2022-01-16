import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  // 이건 로그인 페이지에서 유저가 email로 로그인하려는데 password가 없을 때 유용할 수 있음.
  // socialOnly는 우리에게 해당 계정을 password로 로그인할 수 없다는 것을 알려줄 것이다.
  socialOnly: { type:Boolean, default:false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type:String, required: true },
  location: String,

})

userSchema.pre("save", async function() {
  console.log("Users password:", this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log("Hashed password:", this.password);
});

const User = mongoose.model("User", userSchema);

export default User;