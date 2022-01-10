import Video from "../models/Video";

export const home = async(req, res) => {
  const videos = await Video.find({});
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

export const postUpload = (req, res) => {
  // Upload Video의 input값이 body에 있다고 했었지.
  // console을 보면 잘 출력된 것을 볼 수 있다.
  // 자, 이제 비디오를 어떻게 만들 수 있을까? 
  // 그러기 위해선 document를 만들어줘야 한다. -> 데이터를 가진 비디오.
  // 그 후 document를 database에 저장해주어야 한다.
  const { title, description, hashtags } = req.body;
  // console.log(title, description, hashtags);

  // Video는 함수가 아니기 때문에, 새로 정의해준다는 의미에서 new 키워드를 붙여야 한다고 함...
  const video = new Video({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map(word => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
    // 만약 string에 hashtag가 없는데 추가하고 싶으면 두 가지 function을 이어 실행해주면 된다.
    // "food,movies,music".split(",").map(word => `#${word}`) -> 이러면 #이 붙어서 나오게 되지.
  });
  console.log(video);
  // 확인해보면, Upload Video에서 작성한 title, description등등이 db로 넘어오게 된다!!
  // 이상한 id 값도 있는데 이는 mongoose가 랜덤으로 아이디를 부여해준 것임.
  return res.redirect("/");
};


// hashtags에 대한 여러 케이스를 고려하고 싶은 분들은 startsWith(), trim()을 활용해 보세요 :)

// input : 해시태그1,해시태그#2, #해시태그3, 해시태그4

// hashtags
// .split(",")
// .map((word) =>
// !word.trim().startsWith("#") ? `#${word.trim()}` : word.trim()
// )

// => ["#해시태그1", "#해시태그#2", "#해시태그3", "#해시태그4#]