const express = require("express");
const router = express.Router();
const ctrl = { ctrl: (req, res) => res.send("no code") };
const { postsController } = require("../features");

const auth = require("../middlewares");

const postsAsyncHandler = asyncHandler(postsController);
router.get("/posts", postsAsyncHandler(postsController.getAll));
router.post(
  "/posts",
  auth,
  postsAsyncHandler(postsController.add, postsController)
);
router.get("/posts/:postId", postsController.getOne);
router.put("/posts/:postId", auth, postsController.edit);
router.delete("/posts/:postId", auth, postsController.delete);

module.exports = router;
