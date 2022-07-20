import express from "express";
import { categoriesControllers } from "../modules";

const router = express.Router();
const ctrl = { ctrl: (req, res) => res.send("no code") };
import auth from "../middlewares/index";
import { asyncWrapperForController } from "../lib/async-wrapper-for-controller";
import { CategoriesControllers } from "../modules/categories";

const categoriesAsyncController = asyncWrapperForController<CategoriesControllers>(
  categoriesControllers
);

router.get("/categories", categoriesAsyncController.getAll);
router.post("/categories", auth, categoriesAsyncController.add);
router.get("/categories/:categoryId", categoriesAsyncController.getOne);
router.put("/categories/:categoryId", auth, categoriesAsyncController.edit);
router.delete(
  "/categories/:categoryId",
  auth,
  categoriesAsyncController.delete
);
router.get(
  "/categories/:categoryId/posts",
  categoriesAsyncController.getCategoryByIdWithPosts
);

export default router;
