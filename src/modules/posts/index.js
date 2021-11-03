const { PostsRepo } = require("./posts.repo");
const Posts = require("./posts.model");
const { PostsService } = require("./posts.service");
const { PostsControllers } = require("./posts.controllers");
module.exports = {
  PostsRepo,
  Posts,
  PostsService,
  PostsControllers,
};
