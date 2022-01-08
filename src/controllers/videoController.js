// 템플릿에 변수를 보내기위해, res.render를 호출할 때 변수도 같이 보내주겠다는 뜻.
// render는 2가지 변수를 받음: view의 이름 / 템플릿에 보낼 변수
export const trending = (req, res) => res.render("home", {pageTitle: "Home"});
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");

export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  res.send("Delete Video");
}
