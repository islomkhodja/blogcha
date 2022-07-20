import express from "express";
import { postsAsyncController } from "../modules";

const router = express.Router();

import auth from "../middlewares/index";

router.get("/posts", postsAsyncController.getAll);
router.post("/posts", auth, postsAsyncController.add);
router.get("/posts/:postId", postsAsyncController.getOne);
router.put("/posts/:postId", auth, postsAsyncController.edit);
router.delete("/posts/:postId", auth, postsAsyncController.delete);

export default router;
