export const trending = (req, res) => res.send("Home Page Videos");
export const see = (req, res) => {
  // 일단 잘 동작하는지 확인
  // 출력 결과, object 형태로 id를 문자열로 받음 req.params
  // express는 우리가 입력한 숫자가 변수로 존재한다는것을 이해함.
  console.log(req.params);
  return res.send(`Watch Video #${req.params.id} `);
}
export const edit = (req, res) => {
  // console.log(req.params);
  return res.send("Edit");
}
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  // console.log(req.params);
  res.send("Delete Video");
}
