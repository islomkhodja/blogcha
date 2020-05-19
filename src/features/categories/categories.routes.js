const express = require("express");
const router = express.Router();
const ctrl = { ctrl: (req, res) => res.send("no code") };

const auth = require("../../middlewares");

router.get("/categories", ctrl.ctrl);
router.post("/categories", auth, ctrl.ctrl);

router.get("/categories/:slug", ctrl.ctrl);
router.put("/categories/:slug", auth, ctrl.ctrl);
router.delete("/categories/:slug", auth, ctrl.ctrl);

router.get("/categories/:categoryId/posts", ctrl.ctrl);

module.exports = router;
