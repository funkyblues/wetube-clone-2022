import Video from "../models/Video";

export const home = (req, res) => { 
  console.log("Start");
  Video.find({}, (error, videos) => {
    console.log("Finished");
    return res.render("home", { pageTitle: "Home", videos });
    // DB검색이 안끝났을 때 render되는 것을 방지하기 위해 Video.find 안에 
    // render를 집어넣은 것이다.
  });
  console.log("I want to be last");
};
export const watch = (req, res) => {
  const id = req.params.id;
  return res.render("watch", { pageTitle: "Watching"});
};
export const getEdit = (req, res) => {
  const id = req.params.id;
  res.render("edit", { pageTitle: "Editing"});
}
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
}
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video"});
}

export const postUpload = (req, res) => {
  const { title } = req.body;
  return res.redirect("/");
}



