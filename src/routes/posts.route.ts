import express from "express";
import { postsController } from "../modules";

const router = express.Router();
import { asyncWrapperForController } from "../lib/async-wrapper-for-controller";

import auth from "../middlewares/index";
import { PostsControllers } from "../modules/posts";

const postAsyncController = asyncWrapperForController<PostsControllers>(postsController);

router.get("/posts", postAsyncController.getAll);
router.post("/posts", auth, postAsyncController.add);
router.get("/posts/:postId", postAsyncController.getOne);
router.put("/posts/:postId", auth, postAsyncController.edit);
router.delete("/posts/:postId", auth, postAsyncController.delete);

export default router;
