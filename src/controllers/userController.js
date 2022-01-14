import User from "../models/User";


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
  }
  catch (error) {
    return res.status(400).render("join", { pageTitle, errorMessage: error._message, });
  }
}
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
}

// /login으로부터 post요청을 받았을 때 해야할 일?
// 1. username이 있는지 확인.
// 2. password가 맞는지 확인.
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  // check if account exists
  // username이 같은 사용자가 있는지 mongoose로 mongodb를 확인!!!
  const exists = await User.exists({username});
  if (!exists) {
    return res.status(400).render("login", { pageTitle: "Login", errorMessage:"An account with this username does not exists." })
  }
  // check if password correct
  res.end();
}
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");