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
  // 브라우저는 우리가 준 url로 이동할 것이다.
  // 우리가 어느 비디오를 수정 중인지 알 수 있도록 route로 부터 id 얻어옴.
  const { id } = req.params;
  
  // video의 title 변경 사항을 알 수 있도록,
  // console.log(req.body);
  // 근데 undefined라고 나옴 ㅋㅋ...
  
  // 설정해주어야 할 게 있다. 우리의 express app은 form을 어떻게 다루어야 할 지 모름.
  // app에게 form을 이해할 수 있도록 해야 함. express method 확인.
  // express.urlencoded 참조.
  // edit.pug에서 input을 name="title"로 했어서 {title:"dfasd"} 이렇게 나옴!
  
  // 이제 title을 받아올 수 있돠.
  // const title = req.body.title;
  const { title } = req.body;
  
  // title을 변경해주기 위해! (현재 back-end DB는 없는 상황이므로)
  videos[id - 1].title = title;
  // res.redirect()는 브라우저가 redirect(자동으로 이동)하도록 하는 것
  return res.redirect(`/videos/${id}`);
}


export const search = (req, res) => res.send("Search");
// 3. 비디오를 업로드 할 수 있으면 좋겠다.
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  res.send("Delete Video");
}
