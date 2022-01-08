export const trending = (req, res) => {
  // home.pug를 rendering! -> html로. 그 후 브라우저로 보내줌
  // 하지만 에러가 남. default cwd가 package.json이 실행된 위치라서...
  // cwd는 node.js를 실행하는 디렉토리.
  // 우리의 경우 package.json의 위치.
  res.render("home");
}
export const see = (req, res) => {
  res.render("watch");
}
export const edit = (req, res) => {
  res.render("edit");
}
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  res.send("Delete Video");
}
