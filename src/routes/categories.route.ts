import express from "express";
import { categoriesAsyncController } from "../modules";

const router = express.Router();
const ctrl = { ctrl: (req, res) => res.send("no code") };
import auth from "../middlewares/index";

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
