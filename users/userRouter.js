const express = require("express");
const userDb = require("./userDb.js");
const postDb = require("../posts/postDb.js");

const router = express.Router();

router.use("/:id", validateUserId);

router.post("/", validateUser, async (req, res, next) => {
  // do your magic!
  try {
    const user = await userDb.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    next({ status: 500, errorMessage: "Unable to create User" });
  }
});

router.post("/:id/posts", validatePost, async (req, res, next) => {
  // do your magic!
  try {
    const text = req.body.text;
    const user_id = req.user.id;
    const postData = { text, user_id };
    const data = await postDb.insert(postData);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next({ status: 500, errorMessage: "Unable to get users posts" });
  }
});

router.get("/", async (req, res, next) => {
  // do your magic!
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next({ status: 500, errorMessage: "Unable to get users" });
  }
});

router.get("/:id", async (req, res, next) => {
  // do your magic!
  try {
    const { id } = req.user;
    const user = await userDb.getById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next({ status: 500, errorMessage: "Unable to get user" });
  }
});

router.get("/:id/posts", async (req, res, next) => {
  // do your magic!
  try {
    const { id } = req.user;
    const userPosts = await userDb.getUserPosts(id);
    res.status(200).json(userPosts);
  } catch (error) {
    console.log(error);
    next({ status: 500, errorMessage: "Unable to get posts" });
  }
});

router.delete("/:id", async (req, res, next) => {
  // do your magic!
  try {
    const { id } = req.user;
    const data = await userDb.remove(id);
    data === 1 ? res.status(200).json({ message: `User ${id} deleted` }) : null;
  } catch (error) {
    console.log(error);
    next({ status: 500, errorMessage: "Unable to delete user" });
  }
});

router.put("/:id", async (req, res) => {
  // do your magic!
  try {
    const { id } = req.user;
    const data = await userDb.update(id, req.body);
    data === 1 ? res.status(200).json({ id, ...req.body }) : null;
  } catch (error) {
    console.log(error);
    next({ status: 500, errorMessage: "Unable to make changes" });
  }
});

//custom middleware

async function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  const userId = await userDb.getById(id);
  if (userId) {
    req.user = userId;
    next();
  } else res.status(404).json({ error: "Invalid User ID" });
}

function validateUser(req, res, next) {
  // do your magic!
  const username = req.body.name;
  if (!req.body) {
    next({ status: 400, errorMessage: "Missing User Data" });
  } else if (!username) {
    next({ status: 400, errorMessage: "Missing Required Name Field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const text = req.body.text;
  if (!req.body) {
    next({ status: 400, errorMessage: "Missing Post Data" });
  } else if (!text) {
    next({ status: 400, errorMessage: "Missing Required Text Field" });
  } else {
    next();
  }
}

module.exports = router;
