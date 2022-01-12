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


export const postEdit = async (req, res) => {
  const { id } = req.params;
  // const { title } = req.body;
  // postEdit이 어떤 정보를 받을지 console.log로 확인해보자
  
  // console.log(req.body)

  // 일단은 당연히 업데이트 되지 않는다. ㅋㅋ 주소만 redirect해주는 거니까....
  // 그치만 console창에는 잘 뜬다. 후후. req.body가 무슨 역할을 하는지 기억하자.

  // 수정하기 위한 title, description, hashtags를 req.body로 부터 받자.
  const { title, description, hashtags } = req.body;

  // 해야할 것은?? -> Database내의 video를 찾아야 한다.
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  // 영상 title, description, hashtags들을 수정.
  video.title = title;
  video.description = description;
  video.hashtags = hashtags.split(",").map((word) => `#${word}`);

  // 그러나 여전히 오류가 날 것이다. 왜냐? 우리가 #을 추가하고 있는데,
  // 이미 #이 다 달려있기 때문이지. -> hashtags 관련 function들을 손 봐야 한다.

  // 바꾸기 전에, title, description, hashtags들을 일일히 직접 입력해주고 있다.
  // 지금은 괜찮지만, 영상이 늘어나면 굉장히 귀찮은 일이 될 것이다. 그럼 뭐냐? 함수를 만들어줘야지(맞나?).
  // 그러나 일단은 그대로 진행.
  
  // 우리가 여기서 await를 사용했기 때문에 여기서 에러가 생길 수 있지만 (왜??), 나중에 try catch를 적용하자.
  await video.save();
  // 작동은 잘 하고 있다 ㅎㅎ 그러나 postEdit하는 부분은 개선될 여지가 있다.

  // 일단은 해시태그 부. 수정할 때에는 #을 빼주어야 한다. 굉장히 귀찮은 일.
  // 만약 앞에 #이 있다면 아무것도 추가하지 않을 것임.

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
