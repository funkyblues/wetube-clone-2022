import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  // 최대, 최소 문자길이를 설정해주었다. 여기까지만 하면 에러가 조금 생길거임.
  // (사용자랑 해당 코드가 잘 연결되어 있지 않다면 말여.)

  // 근데 html input에서 제어해줄 수 있는데 굳이 이걸 왜 database에 알려줘야 함??
  // 답은, 둘 다 해줘야 한다.

  // 만약 누군가가 웹사이트에서 html input 에서 삭제한다면, 해당 기능이 사라지기 때문...
  // 그래서 DB에도 설정을 해주어야 한다는 뜻.
  title: {type: String, required: true, trim: true, maxlength: 80}, 
  description: {type: String, required: true, trim: true, minLength: 20}, 
  createdAt: {type:Date, required: true, default: Date.now },
  hashtags: [{type: String, trim: true}],
  meta: {
    views: {type: Number, default: 0, required: true},
    rating: {type: Number, default: 0, required: true},
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
