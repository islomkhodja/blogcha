const db = require("../lib/db");
const { repositoryFactory } = require("objection-repositories");
let {
  Categories,
  CategoriesRepo,
  CategoriesService,
  CategoriesControllers,
} = require("./categories");
let { Users, UsersRepo } = require("./users");
let { PostsRepo, Posts, PostsService, PostsControllers } = require("./posts");
const { UsersController, UsersService } = require("./users");

CategoriesRepo = repositoryFactory.getCustomRepository(
  CategoriesRepo,
  db,
  Categories
);
PostsRepo = repositoryFactory.getCustomRepository(PostsRepo, db, Posts);
UsersRepo = repositoryFactory.getCustomRepository(UsersRepo, db, Users);

const repositories = {
  UsersRepo,
  CategoriesRepo,
  PostsRepo,
};

const usersService = new UsersService(repositories);
const categoryService = new CategoriesService(repositories);
const postService = new PostsService(repositories);

const services = {
  usersService,
  categoryService,
  postService,
};

const usersController = new UsersController(services);
const categoriesControllers = new CategoriesControllers(services);
const postsController = new PostsControllers(services);

module.exports = {
  CategoriesRepo,
  PostsRepo,
  UsersRepo,
  usersController,
  categoriesControllers,
  postsController,
};
