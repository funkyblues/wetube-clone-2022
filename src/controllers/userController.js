export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

// postJoin은 아직 기능 x
// 한번 테스트 해보자
export const postJoin = (req, res) => {
  console.log(req.body);
  res.end();
  // 아주 잘 작동하고 있음! ㅎ 
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");