 //정규식에 대한 MDN의 공식 문서 
 // https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions

import Video from "../models/Video";

export const home = async(req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

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
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id:id });
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
      // 하지만 작성한 middleware는 
      //  videoUpdate를 위한 것에는 소용이 없을거다.
      // 뭐가 필요할까?
    hashtags: hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });
  
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
      // 이제 hashtags를 변경해보려고 한다. 어떻게 될까??
      // 이렇게 되면 hashtags는 array가 아닌 string이 된다. hashtags는 그저 문자열이니까
      hashtags,
      // 콘솔을 보면 hashtag가 저장되는 법도 다르게 된다. mongoose에서 배열로 설정해서 배열로 들어가긴 하지만, 하나의 문자열로
      // 입력이 들어간다.
      // 그럼 이제 hashtags array의 첫 element가 format되는 방식을 설정해보자. #이 들어가야 하니까 -> Video로!
    });
    return res.redirect("/");
  }
  catch(error) {
    return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message, });
  }
};
