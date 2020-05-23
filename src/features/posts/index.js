const { PostsRepo } = require("./posts.repo");
const Posts = require("./posts.model");
const PostsRouter = require("../../routes/posts.route");
module.exports = {
  PostsRepo,
  Posts,
  PostsRouter,
};
