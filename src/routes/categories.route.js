const express = require("express");
const router = express.Router();
const ctrl = { ctrl: (req, res) => res.send("no code") };
const auth = require("../middlewares");
const { categoriesControllers } = require("../features");
router.get("/categories", (req, res, next) =>
  categoriesControllers.getAll(req, res, next)
);
router.post("/categories", auth, (req, res, next) =>
  categoriesControllers.add(req, res, next)
);

router.get("/categories/:categoryId", (req, res, next) =>
  categoriesControllers.getOne(req, res, next)
);
router.put("/categories/:categoryId", auth, (req, res, next) =>
  categoriesControllers.edit(req, res, next)
);
router.delete("/categories/:categoryId", auth, (req, res, next) =>
  categoriesControllers.delete(req, res, next)
);

router.get("/categories/:categoryId/posts", (req, res, next) =>
  categoriesControllers.getCategoryByIdWithPosts(req, res, next)
);

module.exports = router;
