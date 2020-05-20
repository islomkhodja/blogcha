const express = require("express");
const router = express.Router();
const { usersController } = require("../features");
const ctrl = { ctrl: (req, res) => res.send("no code") };

const auth = require("../middlewares");

router.post("/users/login", ctrl.ctrl);

router.get("/users", (req, res, next) =>
  usersController.getAll(req, res, next)
);
router.post("/users", auth, (req, res, next) =>
  usersController.add(req, res, next)
);

router.get("/users/:userId", (req, res, next) =>
  usersController.getOne(req, res, next)
);
router.put("/users/:userId", auth, (req, res, next) =>
  usersController.edit(req, res, next)
);
router.delete("/users/:userId", auth, (req, res, next) =>
  usersController.delete(req, res, next)
);

router.get("/users/:userId/categories", (req, res, next) =>
  usersController.getUsersCategories(req, res, next)
);
router.get("/users/:userId/posts", (req, res, next) =>
  usersController.getUsersPosts(req, res, next)
);

module.exports = router;
