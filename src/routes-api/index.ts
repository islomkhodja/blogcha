import express from "express";
const api = express.Router();

import users from "./users.route";
import categories from "./categories.route";
import posts from "./posts.route";

api.get("/", (req, res) => {
  return res.json({
    message: "welcome to my api",
  });
});

api.use(users);
api.use(categories);
api.use(posts);

export default api;
