const express = require("express");
const router = express.Router();
const { usersController } = require("../modules");
const { asyncHandler } = require("../lib/async-handler");
const ctrl = { ctrl: (req, res) => res.send("no code") };
const auth = require("../middlewares");

const usersAsyncHandler = asyncHandler(usersController);

router.post("/users/login", ctrl.ctrl);

router.get("/users", usersController.getAll);
router.post("/users", auth, usersController.add);

router.get("/users/:userId", usersController.getOne);
router.put("/users/:userId", auth, usersController.edit);
router.delete("/users/:userId", auth, usersController.delete);

router.get("/users/:userId/categories", usersController.getUsersCategories);
router.get("/users/:userId/posts", usersController.getUsersPosts);

module.exports = router;
