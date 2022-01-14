 //정규식에 대한 MDN의 공식 문서 
 // https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions

import Video from "../models/Video";

export const home = async(req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
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
    // 브라우저는 방문한 웹사이트의 히스토리를 저장하는데, 상태코드를 400번대로 받으면 기록하지 않는다.
    // 브라우저는 우리가 errorMessage를 내보내는 것을 모른다.
    // 브라우저에게 상황을 전달할 수 있으니, 좋은 기능이지.
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video"});
};

// videoController에서도 error가 발생할 수 있지.
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags:Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  }
  catch(error) {
    // 이렇게 알맞은 상태코드를 보내주는 것은 정말 중요하다.
    return res.status(400).render("upload", { pageTitle: "Upload Video", errorMessage: error._message, });
  }
};


export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
}

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i")
      },
    });
    console.log(videos);
  }
  return res.render("search", { pageTitle:"Search", videos});
}