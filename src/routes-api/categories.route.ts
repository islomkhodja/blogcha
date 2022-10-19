import express, { Router } from "express";
import { categoriesApiControllers } from "../modules";

const router = express.Router();
import { routerConfigurationForController } from "../lib/router-configurator";
import { CategoriesApiControllers } from "../modules/categories";

routerConfigurationForController<CategoriesApiControllers>(
  categoriesApiControllers,
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
