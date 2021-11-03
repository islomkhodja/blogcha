const express = require("express");
const router = express.Router();
const ctrl = { ctrl: (req, res) => res.send("no code") };
const auth = require("../middlewares");
const { categoriesControllers } = require("../features");
const { asyncHandler } = require("../lib/async-handler");

const categoriesAsyncHandler = asyncHandler(categoriesControllers);

router.get("/categories", categoriesAsyncHandler(categoriesControllers.getAll));
router.post(
  "/categories",
  auth,
  categoriesAsyncHandler(categoriesControllers.add)
);
router.get(
  "/categories/:categoryId",
  categoriesAsyncHandler(categoriesControllers.getOne)
);
router.put(
  "/categories/:categoryId",
  auth,
  categoriesAsyncHandler(categoriesControllers.edit)
);
router.delete(
  "/categories/:categoryId",
  auth,
  categoriesAsyncHandler(categoriesControllers.delete)
);
router.get(
  "/categories/:categoryId/posts",
  categoriesAsyncHandler(categoriesControllers.getCategoryByIdWithPosts)
);

module.exports = router;
