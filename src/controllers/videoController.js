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
  const id = req.params.id;
  const video = videos[id - 1]; 
  return res.render("watch", { pageTitle: `Watching : ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const id = req.params.id;
  const video = videos[id - 1]; 
  res.render("edit", { pageTitle:`Editing : ${video.title}`, video });
}
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  // req.body는 form에 있는 value의 javascript representation 이다.
  // 단 그러기 위해선 express.urlencoded가 필요 ㅋ
  
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
}


export const search = (req, res) => res.send("Search");
// 3. 비디오를 업로드 할 수 있으면 좋겠다.
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  res.send("Delete Video");
}
