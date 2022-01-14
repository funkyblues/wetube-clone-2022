import User from "../models/User";


export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });


// postJoin은 아직 기능 x
// 한번 테스트 해보자
export const postJoin = async (req, res) => {
  // console.log(req.body);
  // res.end();
  // 아주 잘 작동하고 있음! ㅎ 
  const { name, username, email, password, location } = req.body;
  // 입력한 username이 이미 사용중인지 체크해보자.
  const usernameExists = await User.exists({username: username }); //username으로 써도 되는거 알지??
  if(usernameExists) {
    return res.render("join", { pageTitle: "Join", errorMessage: "This username is already taken.",});
  };


  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  // 이렇게 계정을 만들어 준 후에 login page로 redirect 시키면 될 거 같다.
  return res.redirect("/login");
  // 하지만 login page는 아직 "login" 텍스트만 내보내고 있는 것을 알 수 있따.
  // mongo 콘솔로 접속해서 use wetube, show collections, db.users.find({}) 해주면 
  // user의 입력 정보들이 잘 나오는 걸 볼 수 있다 ㅎㅎ
  // 그러나 password가 그대로 보이기 때문에, 보안이 전혀 되지 않는다.
  // 아주 위험한 것임.
  // 그러므로 password를 저장하기 전에 보안처리를 해주어야 한다.
  // 우리의 목표는 이 password를 봐도 해석이 되지 않게 만들어 주는 것.
  // password hashing!!

  // 입력받은 비밀번호를 hashing할거야. hashing은 일방향 함수임.
  // 절대 되돌릴 수 없다. 출력값으로 input값을 알 수 없음.
  // CS에서 이를 deterministic function(결정적 함수)라고 한다.

  // 우리는 bcrypt.js로 password를 해싱할 것이다.
  // 해커는 해싱된 password를 가지고 할 수 있는 공격이 있는데, rainbow table이라는 게 있다. youtube 에서 nomad채널 확인해봐바
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");