import Video from "../models/Video";

export const home = async(req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

// 사실 express에선 굳이 return을 할 이유가 없다. 
// 그러나 return을 해주는 이유는 render작업 후에 종료되도록 하기 위함.
// render한 후 또 render하려고 하면 error
// render뒤에 redirect불러오면 error뜬다!! function 하나만 가져올 수 있다는 것을 명심. 
// return을 적어서 실수 방지가 필요함



// export const home = async (req, res) => {
//   Video.find({}, (error, videos) => {
//     console.log("render once");
//     return res.render("home", { pageTitle: "Home", videos});
//     console.log("render again");
//     // res.render("home", { pageTitle: "Home", videos});
//     res.sendStatus(200); // -> error
//   });
//   // return res.end(); // callback방식을 따르기 때문에, 이렇게 작성하면 서버 끊어짐!
//   // 그러고 나서 callback함수 실행되는데 서버 끊어진 채로 render하니까 error뜨게 됨 ㅋㅋ
// };

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
  const { title } = req.body;
  return res.redirect("/");
};



/*async와 await은 비동기적으로 동작하는 코드들을 동기적으로 동작하는것 처럼 이용할 수 있게 해준다고 알고 있습니다. 서버가 DB에서 파일을 가져오는 작업을 수행할 때, 가져온 데이터를 이용하는 코드가 어느 시점에 동작할 지 예측할 수 없으므로 .then 등으로 db로부터의 로드 이후에 동기적으로 작동하도록 하는 것으로 알고 있는데, 그렇다면 데이터를 db에서 메모리로 load 하는 과정은 node의 스레드에서 수행하는 것이 아닌, OS 와 dbms간의 상호작용(?)인건가요? 이 과정을 Node의 단일 스레드에서 수행하면 Blocking이 발생할텐데, 노드는 그렇게 동작하지 않는것으로 알고있습니다. 클라이언트로부터 시간이 오래걸리는 I/O 작업 요청을 많이, 정말 많이 받았을 때 Node가 이를 처리하는 상세한 방식(구조)을 Event Loop를 포함한 Node의 스레드와 연관지어 설명해주시면 정말 감사하겠습니다.
클라이언트가 요청한 I/O 작업이 3초가 걸리고 이를 작업하는 스레드가 단일 스레드라고 가정했을 때 같은 작업을 100번 요청했을 때 Node는 모든 요청을 받지만 마지막 req에 대한 res는 300초 후에 반환하는게 맞는건지...궁금합니다*/

/* 여기에 대한 답을 안주셔서...개인적으로 공부하면서 해당 궁금증은 해결하였습니다. async와 await은 비동기를 처리하기 위한 로직입니다. 비동기로 동작하는 코드를 마치 동기적으로 돌아가게끔 보이게 하는 방법으로 이해하시면 쉽습니다. 다른말로는, 비동기적으로 동작하는 코드 이후에 다른 코드들의 실행순서를 보장한다고 생각해보세요.*/

/*C#에서 async 와 await를 생각 하시면 쉬울듯 합니다.
비동기를 동기적으로 동작하는 것 처럼 보여주는게 아니고
저 코드 자체가 비동기 동작 코드 입니다.
async는 "애들아 이 함수에는 뭔가 약간 구린 코드가 있어
그러니까 일단 내 볼일 볼때까지 그냥 니들일은 알아서들
하고 있엉~~"
await는 "ㅋㅋㅋ 내가 바로 그 구린녀석이다. 나도 내할일 하고
나서 결과 줄테니까 다른 넘들은 다 각자 할일 하고 있고
단 내뒤에 있는 넘들은(비동기 함수내에 있는 내뒤에 코드들임, 다른 함수들은 뒤에 있어도 비동기기 때문에 이미 실행됨) 일단 대기타라."
이렇게 이해 하시면 쉬울듯 합니다.
애초에 Nodejs는 내부 구조가 이렇게 되어 있어서, 그런 구조로 프로그래밍 할일은 없지만, 유저 한명이 100000기가바이트짜리
데이터를 불러 온다고 해도, 그 뒤에 유저들이 다 "멍~~~" 하는게
아니라, 저 유저의 데이터 처리는 뒤에서 따로 하고 나머지는
비동기로 싹 처리해 줍니다. 즉 싱글 쓰레드지만, 순식간에
번갈아 가면서 처리하면서 왔다리 갔다리 하기 때문에
우리는 잘 못느낌니다.
다만, 첫번째 유저가 쓰레드 자체를 혼자 완전히 독차지할
때보다는 불러오는 속도는 느리겠지요, */