const express = require('express');
const router = express.Router();
const ctrl = { ctrl : (req, res) => res.send('no code') };

const auth = require("../../middlewares")

router.post("/users/login", ctrl.ctrl)
router.post("/users", ctrl.ctrl)


router.get("/users", ctrl.ctrl)
router.post("/users", auth, ctrl.ctrl)

router.get("/users/:userId", ctrl.ctrl)
router.put("/users/:userId", auth, ctrl.ctrl)
router.delete("/users/:userId", auth, ctrl.ctrl)


router.get("/users/:userId/categories", ctrl.ctrl)
router.get("/users/:userId/posts", ctrl.ctrl)

module.exports = router;
