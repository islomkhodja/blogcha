const { PostsRepo } = require("./posts.repo");
const { Posts } = require("./posts.model");
const PostsRouter = require("./posts.route");
module.exports = {
  PostsRepo,
  Posts,
  PostsRouter,
};
