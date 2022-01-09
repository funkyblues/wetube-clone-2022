// db, models를 import하기 위한 파일
// init.js는 필요한 모든 것들을 import 시키는 역할을 할 것.
// import에 이상이 없다면 init.js는 app을 실행시킬 것임.

import "./db";
import "./models/Video";
// 이 연결로 db는 우리 video model을 인지!
// db를 mongoose와 연결시켜서 video model을 인식시키게 됨.
import app from "./server";



const PORT = 4001;
app.listen(PORT, () => console.log(`✔ Server listening on port http://localhost:${PORT} 🚀`));
// app.listen의 PORT 뒤의 handler 부분이 callback. 
// callback은 javascript에서 기다림을 표현하는 하나의 방법이라 생각하면 쉽다.
// PORT에 연결이 확인 되면 특정 function이 시작되는 것.

// (무언가가 발생한 다음) -> 왜? 어떤것들은 실행과 동시에 적용되지 않기 때문이다.
// ex. app.listen같은 경우 PORT 4001에 연결이 되고 실행되어야 하는데 코드가 바로 실행되지 않을 수 있기 때문.
