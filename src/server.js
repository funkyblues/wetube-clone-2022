import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
// const logger = morgan("dev");
// const logger = morgan("common");
// const logger = morgan("short");
const logger = morgan("tiny");


const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("Allowed, you may continue.");
  next();
}

const handleHome = (req, res, next) => {
  return res.send("I love middlewares");
}
const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge.");
}

app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);

app.listen(PORT, () => console.log(`✔ Server listening on port http://localhost:${PORT} 🚀`));

