const express = require("express");
const postDb = require("./postDb");

const router = express.Router();

router.use("/:id", validatePostId);

router.get("/", async (req, res) => {
  // do your magic!
  try {
    data = await postDb.get();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "unable to get posts" });
  }
});

router.get("/:id", async (req, res) => {
  // do your magic!
  const { id } = req.params;
  try {
    data = await postDb.getById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "unable to get that post" });
  }
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

async function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  const postId = await postDb.getById(id);
  if (postId) {
    next();
  } else res.status(404).json({ error: "post id not found" });
}

module.exports = router;
