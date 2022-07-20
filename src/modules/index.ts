import { asyncWrapperForController } from "../lib/async-wrapper-for-controller";

const db = require("../lib/db.ts");
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
  UsersControllers,
} from "./users";
import { PostsRepo, Posts, PostsService, PostsControllers } from "./posts";
import { repositoryFactory } from "../lib/repository";

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

const usersAsyncController = asyncWrapperForController<UsersControllers>(
  usersController
);
const categoriesAsyncController = asyncWrapperForController<
  CategoriesControllers
>(categoriesControllers);
const postsAsyncController = asyncWrapperForController<PostsControllers>(
  postsController
);

export {
  CategoriesRepo,
  PostsRepo,
  UsersRepo,
  usersController,
  categoriesControllers,
  postsController,
  usersAsyncController,
  categoriesAsyncController,
  postsAsyncController,
};
