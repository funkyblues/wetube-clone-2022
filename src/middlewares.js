// 미들웨어를 한번 만들어보자.
export const localsMiddleware = (req, res, next) => {
  // req.session을 확인해보자
  console.log(req.session);
  // 출력되는 결과를 보면 우리의 localsMiddleware는 req.session을 접근할 수 있따.
  // 왜냐면 이는 localsMiddleware가 session middleware다음에 오기 때문.

  // req.session.loggedIn이 undefined, false일 수 있으니 Boolean()을 씌움.
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user;
  
  // 어떤 결과가 나올지 보자.
  // locals object가 잘 나온다 ㅎㅎㅎ
  console.log(res.locals);
  // 서버를 재시작하면 모든 세션이 종료되기 때문에(아직은) loggedIn: false 나옴.
  // 이 object는 template과 공유되고 있다는 것을 안다.

  // 새로고침을 해도 계속 로그인된 상태 ㅎㅎ
  next();
}