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

// getEdit는 object를 edit template으로 보내줘야하기 때문에 video object가 꼭 필요하다.
export const getEdit = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

// postEdit 에선 video object가 꼭 필요하지 않으므로 Video.exists를 해주면 된다.
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  // 우리의 Video model 안에 있는 video object들은, _id라는 id 값들을 가지고 있다.
  // exists는 filter를 필요로 함. 
  // 어떤 속성(property)도 필터가 될 수 있다.

  const video = await Video.exists({ _id:id });
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }

  // 만듦과 동시에 업데이트 하는 mongoose api
  // findByIdAndUpdate 문서를 잘 읽을 것.

  // arguments 순서
  // 1. 업데이트 하고자 하는 영상의 ID.
  // 2. 업데이트 할 정보 혹은 내용.
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    
    
    // hashtags는 영상 업데이트나 영상 생성을 위해서 혹은 업데이트를 위해서, 저장하기 전에 해시태그들을 처리함!
    // 그러므로 해시태그 부분은 Model에 저장하기 전에 처리하는 것들임
    // 그리고 Model에 저장하기 전에 여러가지를 먼저 해야하는 것은 비단 hashtags만이 아닐 것이다.

    // 만약 user를 생성한다고 가정하면, 생성하기 전에 email이 존재하는 이메일인지 아닌지 확인해야 한다.
    // 그러므로 일반적으로 저장하기 전에 고려해야 할 것들이 많음!

    // mongoose에서는 영상을 저장, 혹은 업데이트 전에 이것저것 하라고 시킴
    // 그것을 Middleware라고 한다. Express에서 본 것과 같이 mongoose에도 있음
    // pre, post, hook도 있다. (이름은 중요치 않음)
    // 중요한 것은 얘내들이 끼어들 틈을 만들어 준다는 것.
    // object가 저장되기 전에 무언가를 하고 나머지를 처리할 수 있도록!!

    // 우리의 경우 hashtags를 처리해서 hashtag같이 보이게 하는 function부분이 될 것임.
    // 다음 영상에서 해시태그들을 처리하는 Middleware들을 공부하게 될 것이다.

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
      hashtags: hashtags.split(",").map((word) => word.startsWith("#") ? word : `#${word}`),
    });
    return res.redirect("/");
  }
  catch(error) {
    return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message, });
  }
};
