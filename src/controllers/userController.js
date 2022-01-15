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

  // 여기가 바로 우리가 세션을 수정하는 곳임.
  // 이 두 줄이 실제로 세션을 initialize(초기화) 하는 부분!
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    // scope는 space로 띄워서!
    scope: "read:user user:email",
  };
  // 이렇게 만든 config를 합쳐서 사용하자.
  // URLSearchParams utility를 사용할 것이다.
  // new URLSearchParams(config).toString()해주면, 멋진 URL이 나온다~
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  // 이후 우리가 (참조) 링크에서 설정한 대로 user를 callback url로 redirect 해준다.
  // 그리고 user에게 code를 같이 보내준다. (이 코드는 나중에 사용할 예정!)
  return res.redirect(finalUrl);
};

// 2. user는 GitHub에 의해 내 사이트로 redirect 된다. -> GitHub에서 받은 토큰을 Access 토큰으로 바꿔줘야한다.
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    // URL에 담겨오는 code!
    code: req.query.code,
  };
  // 잘 보내고 있네!
  // console.log(config);
  // 이제 config들을 URL로 다시 넣어야 한다. 왜냐면 또 다른 request를 보내야 하기 때문
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  // finalUrl에 POST request를 보낸다.
  // 그 후 fetch해서 data를 받아오고,

  // 근데 여기서 오류 남. fetch is not defined. 정의가 되어있지 않다. fetch는 브라우저에서만 사용 가능.
  // 문제는 fetch기능이 NodeJS에는 포함되어 있지 않다.
  // 자바스크립트를 쓰고 있어도 function이 똑같지는 않다.
  const data = await fetch(finalUrl, {
    method:"POST",
    headers: {
      // 이게 없으면 Github는 text로 응답할 것임.
      // 우린 JSON이 필요하니 이 부분을 복사해서 headers안에 붙여넣기 수행
      Accept: "application/json",
    }
  });
  // 받아온 data에서 JSON을 추출한다.
  const json = await data.json();
  console.log(json);
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");