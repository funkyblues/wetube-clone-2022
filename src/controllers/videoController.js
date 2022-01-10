import Video from "../models/Video";

export const home = async(req, res) => {
  const videos = await Video.find({});
  // 우리의 video들이 어떻게 생겼을지를 보자
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const id = req.params.id;
  return res.render("watch", { pageTitle: "Watching"});
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

// 에러가 발생할 수 있기 때문에, try / catch를 사용하자
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      // createdAt: Date.now(),
      // 이렇게 required해둔 코드를 없애면, javascript가 무한반복되면서 멈춤.
      // return res.redirect가 발동하지 않아서야.

      // try / catch로 넣어주면, javascript는 try 한 뒤 catch 할 것임
      // catch가 없으면 서버는 아무것도 안할것이다.
  
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  }
  catch(error) {
    // console.log(error);
    // error가 발생하면 upload 다시 render!
    // 그러나 사용자는 에러메시지를 직접 볼 수 없는 상태이다.

    // 1. 에러 메시지를 만들어서 upload template으로 보낸다.
    // Video validation failed가 문자열로 나타난다!
    return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message, });
  }
};
