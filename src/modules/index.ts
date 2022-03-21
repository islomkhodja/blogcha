const db = require("../lib/db.ts");
const { repositoryFactory } = require("objection-repositories");
import {
  Categories,
  CategoriesRepo,
  CategoriesService,
  CategoriesControllers,
} from "./categories";
import {
  Users,
  UsersRepo,
  UsersControllers as UsersController,
  UsersService,
} from "./users";
import { PostsRepo, Posts, PostsService, PostsControllers } from "./posts";

const customCategoriesRepo = repositoryFactory.getCustomRepository(
  CategoriesRepo,
  db,
  Categories
);
const customPostsRepo = repositoryFactory.getCustomRepository(
  PostsRepo,
  db,
  Posts
);
const customUsersRepo = repositoryFactory.getCustomRepository(
  UsersRepo,
  db,
  Users
);

const repositories = {
  UsersRepo: customUsersRepo,
  CategoriesRepo: customCategoriesRepo,
  PostsRepo: customPostsRepo,
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

export {
  CategoriesRepo,
  PostsRepo,
  UsersRepo,
  usersController,
  categoriesControllers,
  postsController,
};
