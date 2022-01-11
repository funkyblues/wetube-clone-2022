 //정규식에 대한 MDN의 공식 문서 
 // https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions

import Video from "../models/Video";

export const home = async(req, res) => {
  const videos = await Video.find({});
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async (req, res) => {
  // request가 가져오는 params들 중 id를 찾을 수 있는 라인이지 요게.
  // const id = req.params.id;
  const { id } = req.params;

  // mongoose documentation 참조! 
  // async가 없으면 await를 쓸 수 없다~
  // id로 Video database의 비디오 목록 조회!

  // 그런데 만약 누군가가 존재하지 않는 video 페이지를 방문했을때는 어떻게 해야하나?
  // 확인해보자
  
  
  // console.log(Video);
  
  
  // 비디오 objects 목록이 나온다.
  // 근데 사용자 임의로 id를 변경한다면?? -> 무한로딩..에 빠진다..
  // null이 출력됨. -> video를 찾을 수 없었다는 소리. 그러나 여전히 에러가 있다.
  // 이는 mongodb, mongoose에서 나온게 아님. -> null로부터 title이라는 속성을 찾을 수 없다는 것이 문제.
  // video는 null이므로 계속 무한로딩인 것...
  // 이것은 예상치 못한 에러.
  // 그럼 우리가 할 수 있는 건? -> 미리체크하는 것


  const video = await Video.findById(id);
  // 이렇게 하면 id가 없는 비디오를 탐색하려 해도 404창이 뜬다!
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video});
};


export const getEdit = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};


export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video"});
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      // hashtags는 현재 잘 돌아가는 코드이지만, 나중에 video를 수정할 때 문제가 생길 거임.
      // 나중에 video를 수정할 때 즈음 해볼거라고 하네. 그때 가서 알려준댕
      // (이렇게 코드를 복붙하는 게 좋은 방법은 아니다)
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  }
  catch(error) {
    return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message, });
  }
};
