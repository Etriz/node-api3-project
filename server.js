const express = require("express");
const postRouter = require("./posts/postRouter.js");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
// server.use(logger);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  // res.send(`<h2>Let's write some middleware!</h2>`);
  res.status(200).json({ message: "it's working", name: "api3-project" });
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request`);
  next();
}

module.exports = server;
