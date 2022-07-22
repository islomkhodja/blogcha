import express, { Router } from "express";
import { categoriesControllers } from "../modules";

const router = express.Router();
import { routerConfigurationForController } from "../lib/router-configurator";
import { CategoriesControllers } from "../modules/categories";

routerConfigurationForController<CategoriesControllers>(
  categoriesControllers,
  router
);

/*
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
*/

export default router;
