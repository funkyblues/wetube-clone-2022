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

// 유저가 로그인하면 그 유저에 대한 정보를 세션에 담을 것이다.
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).render("login", { pageTitle, errorMessage:"An account with this username does not exists." })
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", { pageTitle, errorMessage:"Wrong password" });
  }
  // 이렇게 하면 세션에 정보를 추가하는 것임!~!
  // 이렇게 해서 postLogin을 해주면 세션 DB object에 로그인한 유저의 정보가 입력된다~!

  // 세션 DB를 보면 쿠키 id인, 세션 id가 있는걸 볼 수 있다.
  // loggedIn: true로 되어있고, 유저 정보도 저장되어 있당.

  // 이렇게 화면을 이동할 때 마다 벡엔드에서 유저가 접속해 있다는 것을 알고 있게 된다.

  // 만약 session.loggedIn이 true라면, Join, Login을 없앨 것임.
  // 그러나 pug에서 잘 안되네. 
  // 유저가 누구인지는 알지만 그 정보를 pug 템플릿과 공유하지 못하는 상황.
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");