// 가장 중요한 controller중 하나는 post임.
// get controller들은 페이지를 render하는 것 뿐이지만, postJoin은 실제로 사용되는 기능을 담당하고 있음.
// 데이터를 다루고 에러처리, 유효성 체크 등을 하며 DB와 통신하고 있으니.

import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, confirmPassword, location } = req.body;
  const pageTitle = "Join"
  if (password !== confirmPassword) {
    return res.status(400).render("join", { pageTitle, errorMessage: "Password confirmation does not match.",});
  }

  const exists = await User.exists({$or: [{ username }, { email }]});
  if(exists) {
    return res.status(400).render("join", { pageTitle, errorMessage: "This username/email is already taken.",});
  };
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
  return res.redirect("/login");
  }
  catch (error) {
    return res.status(400).render("join", { pageTitle, errorMessage: error._message, });
  }
}
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
}

// 질문 : 패스워드가 어떤 모양으로 해싱되었는지 모르는데 어떻게 일치하는 지 알 수 있나?
// 해싱은 결정적 함수 : 입력값이 같으면 항상 같은 출력값을 가지게 된다.
// 우리는 DB에 있는 패스워드를 해석할 수 없음! 그러나 패스워드의 해시값을 알고 있으니,
// 유저가 로그인을 할 때 입력한 패스워드를 가지고 해싱을 하면 되는 것임. 그리고 그 값을 DB에 저장된 값과 비교하면 되는 것이지. 
// 이 방법으로 원래 패스워드를 알지 못해도 패스워드의 일치 여부를 알 수 있게 되는 것이다.

// bcrypt의 compare를 쓰면 된다.

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  // 찾는 작업을 두번 하고 있으니, const user만 사용하도록 하자!
  // const exists = await User.exists({ username });

  // pageTitle을 두번 쓰고 있어서 변수 설정
  const pageTitle = "Login";

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", { pageTitle, errorMessage:"An account with this username does not exists." })
  }
  // console.log(user.password);

  // 사용자가 입력한 password와 DB에 저장해둔 암호화된 user.password를 입력.
  // 잘 작동한다!
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", { pageTitle, errorMessage:"Wrong password" });
  }
  // res.end();
  //이 부분에 이제 실제로 유저를 로그인 시켜야 한다.
  console.log("LOG USER IN! COMING SOON!");
  return res.redirect("/");
  // 로그인 했다는 말은 접속한 유저가 누구인지 기억하고 있다는 뜻.
  // 이를 위해서는 쿠키, 세션에 대한 이해가 필요하다.
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");