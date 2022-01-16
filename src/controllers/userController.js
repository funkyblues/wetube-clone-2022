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


  /*
  밑의 await 코드는, 다음과 같이 쓸 수도 있다.
  fetch(x).then(response => response.json()).then(json => access_token)
  근데 이렇게 쓰는 건 좋지 않다. 왜냐?
  이렇게 하면 우린 .then안으로 들어가야 access_token을 얻을 수 있는데,
  그 줄에서 다시 fetch를 해야한다는 소리가 되기 때문. 그래도 일단 해보자.
  */ 
  // fetch(finalUrl, {
  //   method:"POST",
  //   headers: {
  //     Accept: "application/json",
  //   },
  // }).then(response => response.json()).then(json => {
  //   if ("access_token" in tokenRequest) {
  //     const { access_token } = tokenRequest;
  //     const apiUrl = "https://api.github.com"
  //     fetch(`${apiUrl}/user`, {
  //         headers: {
  //           Authorization: `token ${access_token}`,
  //         },
  //         // 그리고 이 부분에 .then(json => {});을 쓰면 이 부분에서 user데이터를 가져올 수 있다.
  //       }).then(response => response.json()).then(json => {
  //       fetch(`${apiUrl}/user/emails`, {
  //         headers: {
  //           Authorization: `token ${access_token}`,
  //         },
  //       });
  //     });
  //   }
  // });

  // 어으 넘 복잡해. 이건 좋은 생각이 아냐. then을 쓰는 대신 async await를 쓰자.

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
    const email = emailData.find(email => email.primary === true && email.verified === true);
    if (!email) {
      return res.redirect("/login");
      // 나중에는 에러 notification을 보여주며 redirect 시켜볼거임
    }
    // 여긴 email이 primary & verified
    // user데이터도 받을 거여
    // 그러니 user를 로그인 시키거나, 계정을 생성시킬 수 있음. 왜냐면 email이 없다는 뜻일 테니까(???)

    // 그리고 동일한 user email은 갖고 있지만 한 명은 일반 password로 로그인하고 다른 한명은 GitHub로 로그인하는 user를 어떻게 다룰 지 알아볼거임

    // email과 password로 계정을 생성한 user가 GitHub로 로그인 하려고 하면 어떻게 할 것인지 생각....
    // 그리고 똑같은 email이 있다면... 
      // 두 개의 계정??
      // 계정들을 하나로 통합??
      // user에게 이미 해당 email로 만든 계정이 있다고 에러??
  }
  else {
    return res.redirect("/login");
  }
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");