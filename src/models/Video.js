import mongoose from "mongoose";

// model을 생성하기 전에 model의 형태를 정의해 주어야 함.
// schema로 알려져 있다.

const videoSchema = new mongoose.Schema({
  title: String, //{type: String}
  description: String, //{type: String}
  createdAt: Date,
  hashtags: [{type: String}],
  meta: {
    views: Number,
    rating: Number,
  },
});

// 위에서 정의한 schema와 같은 video모델을 정의함.
const Video = mongoose.model("Video", videoSchema);
export default Video;

// 해야할 것이 하나 있다.
// 우리가 올린 비디오를 모두가 알 수 있도록 해야 함 -> 어떻게?
// (영상 자체가 아니라 우리 video model의 존재)
// 아무도 이 video model을 import 하고 있지 않기 때문에 누구도 존재를 알 수 없음.
// 그래서 video model을 미리 import 해야한다.

// server.js에 정의해 주자.