import User from "../models/User";


export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, confirmPassword, location } = req.body;
  const pageTitle = "Join"

  // DB에 저장은 안되므로 잘 작동하긴 하지만, 브라우저는 비밀번호를 저장할까요? 하는 창을 띄워버린다.
  // status code(상태코드)를 알 필요가 있다.

  // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes(참고)
  // 왜 chrome이 그런 창을 띄웠냐면, 2xx HTTP request를 보냈기 때문. 이것은 성공적인 응답으로 인식하기 때문에,
  // 그래서 크롬이 계정 생성이 성공적이었다고 판단하게 되는 것. 
  // 우린 user에게 errorMessage를 잘 보여줬지만, 브라우저는 200을 받았기 때문에 계정 생성이 잘 되었다고 판단하게 되는 것.
  // 기본적으로 res.render같은걸 하게 되면 상태코드 200을 받게 된다.

  // 그래서 우리는 상태코드 400을 사용할 것. 
  // 400: Bad request 클라이언트에서 발생한 에러 때문에 요청을 처리 못할 때 쓰는 것
  // 그럼어떻게 쓸 수 있냐?
  // res.render() 사이에 status(400)을 추가하면 된다. 그럼 이제 크롬이 비번 저장할까요? 라고 안물을거야.

  if (password !== confirmPassword) {
    return res.status(400).render("join", { pageTitle, errorMessage: "Password confirmation does not match.",});
  }
  const exists = await User.exists({$or: [{ username }, { email }]});
  
  if(exists) {
    return res.status(400).render("join", { pageTitle, errorMessage: "This username/email is already taken.",});
  };
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");