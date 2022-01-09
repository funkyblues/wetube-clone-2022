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




  // 예시를 위한 코드!! (callback의 힘: 특정 코드를 마지막에 실행하게 함)
  console.log("Starting Search");
  Video.find({}, (error, videos) => {
    console.log("Finished Search");
    console.log("errors", error); // errors -> null
    console.log("videos", videos); // videos -> []
  });
  // search terms가 {}로 비어있으면 모든 형식을 찾는다는 것을 뜻함.
  // 그 다음으로 callback을 전송. 이 callback은 err, docs라는 signature를 가짐.

  // callback을 사용하면 아무것도 return 되지 않아야 한다.
  console.log("hello"); // -> hello가 error, videos보다 먼저 나온다.
  // 코드 상으로는 error, video가 위에 있으니 error, video, hello가 나와야 하는데 그렇지 않음
  console.log("I should be the last one");
  // 정리
  // 먼저 DB가 연결 -> hello가 출력 -> template을 render -> 그 후 errors와 videos 출력
  // 오래 걸리지는 않지만 약간의 시간이 걸린다.
  // (기억: 먼저 /(home) page를 request하고 console.log("hello") 출력. render과정을 거쳐야 logger를 얻게 됨. 
  // response를 요청해서 받은 후 다시 전송해야 logger에 찍히는것이지. render와 response과정 이후 error, videos를 console.log하는 것이다. )


  return res.render("home", { pageTitle: "Home", videos: [] })





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



