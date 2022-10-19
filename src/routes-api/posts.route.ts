import express from "express";
import { postsApiAsyncController } from "../modules";

const router = express.Router();

import auth from "../middlewares/index";

router.get("/posts", postsApiAsyncController.getAll);
router.post("/posts", auth, postsApiAsyncController.add);
router.get("/posts/:postId", postsApiAsyncController.getOne);
router.put("/posts/:postId", auth, postsApiAsyncController.edit);
router.delete("/posts/:postId", auth, postsApiAsyncController.delete);

export default router;
