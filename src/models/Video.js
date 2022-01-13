// db안에 영상들 지우는 방법!! : db.videos.remove({}) 이렇게 하면 된다.

import mongoose from "mongoose";
import videoRouter from "../routers/videoRouter";

// 이건 이제 필요 없다 
// export const formatHashtags = (hashtags) => hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));

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
// 더 나은것이 있다고 해서 이전의 코드는 지운다.
// 그러면, 이전에 한 대로 해시태그 만드는 코드를 복붙해야하는데 귀찮고 오류가 생길 수 있는 위험이 있다.

// 해결하기 위한 한 가지 옵션이 있다. 함수를 만드는 것이지. 이것도 나쁜 방법은 아니다. 괜춘.
// 이렇게 해도 잘 작동된다

// 하지만 Static 이란 것이 있대. 이걸 알려주려고 그랬나봐.
// https://mongoosejs.com/docs/guide.html
// Schema.static이랑 function, 만들고자 하는 static의 이름이 필요.

videoSchema.static("formatHashtags", function(hashtags) {
  return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});


const Video = mongoose.model("Video", videoSchema);
export default Video;
