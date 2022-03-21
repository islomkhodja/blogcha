import express from "express";
import { categoriesControllers } from "../modules";

const router = express.Router();
const ctrl = { ctrl: (req, res) => res.send("no code") };
import auth from "../middlewares/index";
import { asyncHandler } from "../lib/async-handler";

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

export default router;
