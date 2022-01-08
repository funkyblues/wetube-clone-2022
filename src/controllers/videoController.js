const fakeUser = {
  username: "Changuk",
  loggedIn: true,
}

export const trending = (req, res) => res.render("home", {pageTitle: "Home", fakeUser: fakeUser});
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");

export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  res.send("Delete Video");
}
