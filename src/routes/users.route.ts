import express from "express";

const router = express.Router();
import { asyncWrapperForController } from "../lib/async-wrapper-for-controller";
import { usersController } from "../modules";

const ctrl = { ctrl: (req, res) => res.send("no code") };
import auth from "../middlewares/index";
import { UsersControllers } from "../modules/users";

const usersAsyncController = asyncWrapperForController<UsersControllers>(usersController);

router.post("/users/login", ctrl.ctrl);

router.get("/users", usersAsyncController.getAll);
router.post("/users", auth, usersAsyncController.add);

router.get("/users/:userId", usersAsyncController.getOne);
router.put("/users/:userId", auth, usersAsyncController.edit);
router.delete("/users/:userId", auth, usersAsyncController.delete);

router.get(
  "/users/:userId/categories",
  usersAsyncController.getUsersCategories
);
router.get("/users/:userId/posts", usersAsyncController.getUsersPosts);

export default router;
