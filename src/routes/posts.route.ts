import express from "express";
import { postsController } from "../modules";
const router = express.Router();
import { asyncHandler } from "../lib/async-handler";

import auth from "../middlewares/index";

const postsAsyncHandler = asyncHandler(postsController);
router.get("/posts", postsAsyncHandler(postsController.getAll));
router.post("/posts", auth, postsAsyncHandler(postsController.add));
router.get("/posts/:postId", postsController.getOne);
router.put("/posts/:postId", auth, postsController.edit);
router.delete("/posts/:postId", auth, postsController.delete);

export default router;
