const express = require("express");
const api = express.Router();

const users = require("./users.route");
const categories = require("./categories.route");
const posts = require("./posts.route");

api.use(users);
api.use(categories);
api.use(posts);

module.exports = api;
