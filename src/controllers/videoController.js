let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 3,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

export const trending = (req, res) => { 
  return res.render("home", { pageTitle: "Home", videos })
};
// 2. 유저가 오직 하나의 비디오를 볼 수 있으면 좋겠다.
export const watch = (req, res) => {
  // console.log(req.params);
  // req.params로 id값을 얻을 수 있다! {id: '1'}
  
  
  const id = req.params.id;
  // const { id } = req.params;
  // 둘 다 같은 효과!

  // console.log("Show video", id);
  const video = videos[id - 1]; // videos array안에 id가 0부터 시작하니까~
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search");
// 3. 비디오를 업로드 할 수 있으면 좋겠다.
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  res.send("Delete Video");
}
