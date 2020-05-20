const express = require("express");
const api = express.Router();

const users = require("./routes/users.route");
const categories = require("./features/categories/categories.routes");
const posts = require("./features/posts/posts.route");

api.use(users);
api.use(categories);
api.use(posts);

module.exports = api;
