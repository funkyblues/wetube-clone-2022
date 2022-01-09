import Video from "../models/Video";


export const home = (req, res) => { 
  // Video.find();
  // 사용하기 위한 방식으로는 callback, promise 두 가지가 있다. 이게 뭐임???

  // init.js 부분에 callback을 간략히 요약함.
  // Video도 마찬가지로, 만약 callback 방식으로 사용하려면, 데이터가 전송되는 것을 기다려야 한다.
  // 우리가 받는 데이터는 javascript 파일 속에 없기 때문에. -> 이게 DB임.

  // Video.find()의 경우, database의 상황에 따라 전송속도가 느릴 수 있다. javascript 밖에 있기 때문에.
  // 약간의 기다림이 필요하다.
  // 먼저 callback방식으로 사용하는 법 부터.

  Video.find({}, (err, docs) => {});
  // search terms가 {}로 비어있으면 모든 형식을 찾는다는 것을 뜻함.
  // 그 다음으로 callback을 전송. 이 callback은 err, docs라는 signature를 가짐.

  return res.render("home", { pageTitle: "Home" })
};
export const watch = (req, res) => {
  const id = req.params.id;
  return res.render("watch", { pageTitle: "Watching"});
};
export const getEdit = (req, res) => {
  const id = req.params.id;
  res.render("edit", { pageTitle: "Editing"});
}
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video"});
}

export const postUpload = (req, res) => {
  const { title } = req.body;
  return res.redirect("/");
}



