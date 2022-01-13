// db안에 영상들 지우는 방법!! : db.videos.remove({}) 이렇게 하면 된다.

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {type: String, required: true, trim: true, maxlength: 80}, 
  description: {type: String, required: true, trim: true, minLength: 20}, 
  createdAt: {type:Date, required: true, default: Date.now },
  hashtags: [{type: String, trim: true}],
  meta: {
    views: {type: Number, default: 0, required: true},
    rating: {type: Number, default: 0, required: true},
  },
});

videoSchema.pre("save", async function() {
  // https://mongoosejs.com/docs/middleware.html
  // 여기보면 mongoose middleware에 관해서 정말 훌륭한 것이 있다.
  // function 안에 this 라는 키워드가 있다.
  // 이 this는 우리가 저장하고자 하는 문서를 가리킨다.
  // 한번 확인해보자


  // console.log("We are about to save: ", this);


  // 이렇게 하면 우리가 upload를 통해 생성한 video에 대한 title, description, hashtags 및 meta 등등 데이터가 나온다.
  // this.title = "Hahaha! I'm a middleware!!!" 

  // 코드를 잘 읽어봐 이해할 수 있음 ㅎㅎ 
  // 첫 번째 요소가 string이니까 받은 다음에 ,로 나누고  #이 있나 없나 확인 후 다시 배열 할당!
  this.hashtags = this.hashtags[0].split(",").map((word) => word.startsWith("#") ? word : `#${word}`); // this.hashtags가 array이니까. [0]하면 string이 될 것이다.
  // 잘 작동한다!
  // 이것이 pre middleware를 save이벤트에 적용시킨 결과!
  // 하지만 videoUpdate를 위한 것에는 소용이 없을거다.
})


// 중요! mongoose에선 middleware를 model이 생성되기 전에 만들어야 한다.

const Video = mongoose.model("Video", videoSchema);
export default Video;
