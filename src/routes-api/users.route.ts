import express from "express";

const router = express.Router();
import { usersApiAsyncController } from "../modules";

const ctrl = { ctrl: (req, res) => res.send("no code") };
import auth from "../middlewares/index";

router.post("/users/login", ctrl.ctrl);

router.get("/users", usersApiAsyncController.getAll);
router.post("/users", auth, usersApiAsyncController.add);

router.get("/users/:userId", usersApiAsyncController.getOne);
router.put("/users/:userId", auth, usersApiAsyncController.edit);
router.delete("/users/:userId", auth, usersApiAsyncController.delete);

router.get(
  "/users/:userId/categories",
  usersApiAsyncController.getUsersCategories
);
router.get("/users/:userId/posts", usersApiAsyncController.getUsersPosts);

export default router;
