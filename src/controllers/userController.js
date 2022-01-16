import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { token } from "morgan";

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

  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await( 
    await fetch(finalUrl, {
      method:"POST",
      headers: {
        Accept: "application/json",
    }
  })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com"
    const userData = await (
      // access_token이 있으면, 아래 URL에서 GitHub API를 사용할 수 있다.
      // 우리가 scope에 명시한 내용에 대해서만 가능.

      // user의 email을 요청하기 위해 똑같은 access_token을 사용해야 한다.
      // (참조) GitHub rest api에서 Emails에 List email addresses for the authenticated user항목에서 찾음

      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    // console.log(userData);

    // user의 email을 봅시다.
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    // user의 email을 봅시다.
    // console.log(emailData);

    // email 잘 나오는데, 이것들 중 primary인 것과, verified인 것을 확인하자.
    // emailObj는 primary===true와 verified===true인 것들만 모아둔 객체!!
    const emailObj = emailData.find(email => email.primary === true && email.verified === true);
    if (!emailObj) {
      return res.redirect("/login");
    }

    // 기존 user에서 찾겠다.
    const existingUser = await User.findOne({email: emailObj.email});

    // 만일 해당 email을 가지는 user가 이미 있다면, 로그인 시키겠다!

    // 와 잘 된다 ㄷㄷ
    // 만약 mongodb에서 유저를 지운다면?

    if (existingUser) {
      req.session.loggedIn = true;
      req.session.user = existingUser;
      return res.redirect("/");
    }

    // DB에 해당 email을 가진 user가 없을 때
    // 나중에 여기에서는 계정 생성하는 것을 추가해야 한다.
    // 해당 email로 user가 없으니, 계정을 생성해야한다는 뜻.

    else {
      const user = await User.create({
        name: userData.name? userData.name : "Unknown",
        username: userData.login,
        email: emailObj.email,
        // GitHub계정을 통해 만들었다면 password가 없는 것이지.
        // 그러니, username, password form을 쓸 수 없고 socialOnly가 true인 것을 알려주엉 ㅑ한다.
        password: "",
        socialOnly: true,
        location: userData.location? userData.location : "Unknown",
      });
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");

      // 이렇게 하면 잘 들어온다.
      // mongoDB에 사용자 보면 name은 github 프로필에 저장해둔 이름, username은 github 이름
      // 패스워드는 비어있는 해시값, email은 github 이메일 등등.....
    }

    // 이전 강의에서 이어서..
    // DB에 username과 password가 저장되어 있다면, 그걸로 로그인 하면 되지만
    // 만약 GitHub으로 로그인 버튼을 누르게 되면, GitHub으로 로그인 한 user는 DB상에서 똑같은 email과 password를 가진 user를 받게 된다.
    
    // 정리하자면, 내 웹사이트에서 email과 password로 계정 생성 후 
    // 1달 뒤에 와서 GitHub으로 로그인 시도. GitHub은 email을 줄것이고..
    // 근데 email이 똑같다면? 어떻게??

    // 1. 이미 동일한 email이 있으니 그것으로 로그인 해야한다.
    // 2. 똑같은 email이 있다는 걸 증명했으니 GitHub로 로그인해도 된다. 고 할 수도있다.

    // 즉 password가 있거나 GitHub의 email이 Verified된 것이라면 사용자가 email의 주인이라는 뜻이니 로그인 시켜도 된다.
    // 또 예를 들어 GitHub Login으로 계정을 만든 user가 있을 때(즉, email은 있지만 password가 없는 경우), 로그인 화면에서 user에게 email은 있지만 password가 없다고 말해줘야 한다.
    // 이것은 그들이 GitHub으로 로그인해야한다는 뜻.


    // 그러니까 이제 뭘 할거냐면, 만약 primary인 email을 받고 DB에서 같은 email을 가진 user를 발견하면 그 user를 로그인 시켜주겠다.
    // 사실 email은 객체. 이 객체가 필요하다.
  }
  else {
    return res.redirect("/login");
  }
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");