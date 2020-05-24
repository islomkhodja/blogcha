const express = require("express");
const router = express.Router();
const ctrl = { ctrl: (req, res) => res.send("no code") };
const { postsController } = require("../features");

const auth = require("../middlewares");

router.get("/posts", (req, res, next) =>
  postsController.getAll(req, res, next)
);
router.post("/posts", auth, (req, res, next) =>
  postsController.add(req, res, next)
);

router.get("/posts/:postId", (req, res, next) =>
  postsController.getOne(req, res, next)
);
router.put("/posts/:postId", auth, (req, res, next) =>
  postsController.edit(req, res, next)
);
router.delete("/posts/:postId", auth, (req, res, next) =>
  postsController.delete(req, res, next)
);

module.exports = router;
