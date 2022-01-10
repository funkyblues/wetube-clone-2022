import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {type: String, required: true}, //{type: String}
  description: {type: String, required: true}, //{type: String}
  createdAt: {type:Date, required: true, default: Date.now },
  // 그런데 수많은 model에 각각 이렇게 해주는게 끔찍할 수 있다.... 그러니 default를 사용!
  // Date.now에 ()를 하지 않는 것이 중요. ()해주면 function을 즉각 실행할 것.
  // 그게 아닌 Mongoose가 알아서 Date.now를 실행해주도록 하기 위함.

  // 이렇게 해주고 실행하면 생성한 video가 createdAt항목을 가지고 있지 않아도
  // 오류가 발생하지 않고 새로운 video를 생성해준다!
  hashtags: [{type: String}],
  meta: {
    // 이렇게 default를 쓰면 required가 무쓸모다~~
    views: {type: Number, default: 0, required: true},
    rating: {type: Number, default: 0, required: true},
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
