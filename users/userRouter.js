const express = require("express");
const userDb = require("./userDb.js");

const router = express.Router();

router.use("/:id", validateUserId);

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", async (req, res) => {
  // do your magic!
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get users" });
  }
});

router.get("/:id", async (req, res) => {
  // do your magic!
  try {
    const user = await userDb.getById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get user" });
  }
});

router.get("/:id/posts", async (req, res) => {
  // do your magic!
  try {
    const userPosts = await userDb.getUserPosts(req.params.id);
    res.status(200).json(userPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to get posts" });
  }
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

async function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  const userId = await userDb.getById(id);
  userId ? next() : res.status(404).json({ error: "user id not found" });
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
