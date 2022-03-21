import express from "express";
const api = express.Router();

import users from "./users.route";
import categories from "./categories.route";
import posts from "./posts.route";

api.use(users);
api.use(categories);
api.use(posts);

export default api;
