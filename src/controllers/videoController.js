 //정규식에 대한 MDN의 공식 문서 
 // https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions


 // Video는 default export, formatHashtags는 default export 가 아님.
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

      // findByIdAndUpdate를 위한 pre middleware는 없다.
      // (반면에 findOneAndUpdate에 대한 middleware는 있음. 그러나 save hook을 호출하지는 않는다....)
      // 그리고 findOneAndUpdate에서는 업데이트 하려는 문서에 접근할 수 없음.
      // 우리는 save와 update에 저장하는 기능이 각각필요하다.

      // https://mongoosejs.com/docs/middleware.html 참조!
    hashtags: Video.formatHashtags(hashtags),
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
      // 이제 직접 만든 function이(해시태그 포매팅하는거) formatHashtags를 통해 접근이 가능하다.
      // 이제 import뭐시기 할 필요가 없어진다!!!!
      hashtags:Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  }
  catch(error) {
    return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message, });
  }
};
