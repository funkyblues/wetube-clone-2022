# Wetube-clone-2022

Wetube Clone built using NodeJS, Express, MongoDB and ES6

<!-- users에 join login을 넣기 보단, 약간의 예외를 둬서 보기 깔끔하도록 -->
<!-- GLOBAL ROUTER -->

/ -> Home
/join -> Join
/login -> Login
/search -> Search

<!-- USERS ROUTER -->

/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit My Profile
/users/remove -> Remove My Profile

<!-- VIDEOS ROUTER -->

/videos/:id -> See Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video

<!-- /videos/comments -> Comment on a video -->
<!-- comment는 나중에 -->
