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

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const video = new Video({
    // 만약 title에 String이 아닌 숫자를 넣으면 어떻게 될까?
    // 숫자를 넣어도 문제없이 string으로 변환된다
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map(word => `#${word}`),
    meta: {
      // 여기에 string을 넣으면 어떻게 될까??
      // meta없이 console에 출력된다.
      // (잘못된 정보를 보냈기 때문!)

      // mongoose에 의해 보호받고 있음! 그러므로 먼저 mongoose에게 데이터 타입을 알려줘야 하는겨
      views: 0,
      rating: 0,
    },
  });
  // 그러나 현재 video는 javascript 세계에 있기 때문에, database로 보내줘야 함
  const dbVideo = await video.save();
  // save는 promise를 return 해줌 -> 이 말은 save 작업이 끝날때 까지 기다려줘야 한다는 뜻이지
  // save가 되는 순간 기다려줘야 한다 database에 기록되고 저장되는데에는 시간이 걸리기 때문.
  // 그러니까 async로 비동기 해주고, await를 video.save()에 적어준다!
  
  // save는 promise를 return하고 이걸 await 하면 document가 return 된다.
  
  console.log(dbVideo);

  // 잘 저장되어서 화면에 출력되는 것을 볼 수 있다 ㅎㅎ

  // console창으로 가서 mongo활성화 시킨 후, show dbs, use wetube, show collections하면 videos가 나온당
  // collection: document들의 묶음

  // 데이터를 DB에 저장하는 방식은 두가지 정도임 
  // 하나는 위에서 한 것 처럼 javascript object를 만들고 object를 database에 저장.

  // 다른 방법은,
/*export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  await Video.create({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });*/ 

  // 에러가 발생할 수 있기 때문에, try / catch를 사용하자

  return res.redirect("/");
};
