import express from "express";

const router = express.Router();
import { asyncHandler } from "../lib/async-handler";
import { usersController } from "../modules";
const ctrl = { ctrl: (req, res) => res.send("no code") };
import auth from "../middlewares/index";

const usersAsyncWrapper = asyncHandler(usersController);

router.post("/users/login", ctrl.ctrl);

router.get("/users", usersAsyncWrapper(usersController.getAll));
router.post("/users", auth, usersAsyncWrapper(usersController.add));

router.get("/users/:userId", usersAsyncWrapper(usersController.getOne));
router.put("/users/:userId", auth, usersAsyncWrapper(usersController.edit));
router.delete(
  "/users/:userId",
  auth,
  usersAsyncWrapper(usersController.delete)
);

router.get(
  "/users/:userId/categories",
  usersAsyncWrapper(usersController.getUsersCategories)
);
router.get(
  "/users/:userId/posts",
  usersAsyncWrapper(usersController.getUsersPosts)
);

export default router;
