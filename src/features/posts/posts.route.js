const express = require("express");
const router = express.Router();
const ctrl = { ctrl: (req, res) => res.send("no code") };

const auth = require("../../middlewares");

router.get("/posts", ctrl.ctrl);
router.post("/posts", auth, ctrl.ctrl);

router.get("/posts/:slug", ctrl.ctrl);
router.put("/posts/:slug", auth, ctrl.ctrl);
router.delete("/posts/:slug", auth, ctrl.ctrl);

module.exports = router;
