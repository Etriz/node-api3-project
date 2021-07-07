const express = require("express");
const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

server.use(express.json());
server.use(helmet());
// server.use(morgan("dev"));
server.use(logger);
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  // res.send(`<h2>Let's write some middleware!</h2>`);
  res.status(200).json({ message: "it's working", name: "api3-project" });
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.url} on ${new Date()}`);
  next();
}

function errorHandler(err, req, res, next) {
  console.log("Error:", err.errorMessage);
  const code = err.status || 400;
  res.status(code).json(err);
}

server.use(errorHandler);
module.exports = server;
