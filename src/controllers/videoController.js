import Video from "../models/Video";

//   // callback의 장점은 추가적인 코드 없이 에러들을 바로 볼 수 있다는 점.
//   Video.find({}, (error, videos) => {
//     if (error) {
//       return res.render("server-error");
//     }
//     // 하지만 function안에 function을 쓰는 건 그렇게 좋지 않음...
//     // 그래서 promise!
//     // promise는 callback의 최신 버전이라 생각하면 편하다.
//     // 
//     return res.render("home", { pageTitle: "Home", videos });
//   });
// };

// promise: 아래와 같이 작성하면 모든 코드가 순서대로 실행된다.
// 혹시 그럼 에러는 어떻게 처리하나요??? -> try / catch
// try: 말 그대로 무엇인가를 try. 그러다가, 만약 에러가 있다면??
// catch: 에러가 있다면 여기로 와서, 그 에러들을 catch.
// 하지만, callback의 경우 에러가 어디에서 오는지 명확하지만 promise는 그러지 못하다(아직은)
// 에러를 인식하는 것이 catch의 역할!
// 에러메시지가 필요하다면 catch(error)이렇게 써주면 된다.



// I start -> 비디오 검색 후 -> I finished -> [](빈 비디오 목록) -> render
export const home = async(req, res) => { 
  try {
    console.log("I start");
    const videos = await Video.find({}); // -> javascript는 DB에게 결과값을 받을 때 까지 이 라인에서 기다리고 있을 것임!!!
    // await를 find앞에 적으면 find는 내가 callback을 필요로 하지 않는다는 것을 알게 됨.
    // 그러므로 find는 찾아낸 비디오를 바로 출력해줌.

    // await가 대단한 이유는 database를 기다려주기 때문이다.
    // 이렇게 하면 코드를 읽을때 이해하기가 정말 편해진다.
    // 코드를 읽다가 await를 보면 -> javascript가 무언가를 기다리는 구나 라고 생각할 수 있다!
    // 코딩 규칙상 await는 function 안에서만 사용이 가능
    // (해당 함수가 asyncronous인 경우에만 가능)

    console.log("I finished");
    console.log(videos); // 여기서!
    return res.render("home", { pageTitle: "Home", videos })
  }
  catch(error) {
    return res.render("server-error", {error});
  }

};

// 만약 promise가 아니었다면 이렇게 코드를 작성해야 했을 것이다.

// callback 방식
/* Video.find({}, (error, videos) => {
  if (error) {
    return res.render("server-error");
  }
  return res.render("home", { pageTitle: "Home", videos });
});
 */ 

/* javascript는 원래 기다리는 기능이 없었기에, 위에서 밑으로 코드를 순서대로 읽는다.
하지만 작업별로 시간이 달라 꼬이는 경우가 발생했고, callback이란 해결책을 고안했음.
callback: 어떤 동작이 끝나면 특정 function을 부르도록. -> 왜? javascript는 기다리는 기능이 없으므로.
그러나 await가 생기고 달라짐.
*/


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



