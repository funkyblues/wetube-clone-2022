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
  const video = await Video.findById(id);
  // console.log(video);
  return res.render("watch", { pageTitle: video.title, video});
};
export const getEdit = (req, res) => {
  const id = req.params.id;
  res.render("edit", { pageTitle: "Editing"});
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
