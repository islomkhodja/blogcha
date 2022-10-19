import { asyncWrapperForController } from "../lib/async-wrapper-for-controller";

const db = require("../lib/db.ts");
import {
  Categories,
  CategoriesRepo,
  CategoriesService,
  CategoriesApiControllers,
} from "./categories";
import {
  Users,
  UsersRepo,
  UsersApiControllers,
  UsersService,
} from "./users";
import { PostsRepo, Posts, PostsService, PostsApiControllers } from "./posts";
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

const usersApiController = new UsersApiControllers(services);
const categoriesApiControllers = new CategoriesApiControllers(services);
const postsApiController = new PostsApiControllers(services);

const usersApiAsyncController = asyncWrapperForController<UsersApiControllers>(
  usersApiController
);
const categoriesApiAsyncController = asyncWrapperForController<
  CategoriesApiControllers
>(categoriesApiControllers);
const postsApiAsyncController = asyncWrapperForController<PostsApiControllers>(
  postsApiController
);

export {
  CategoriesRepo,
  PostsRepo,
  UsersRepo,
  usersApiController,
  categoriesApiControllers,
  postsApiController,
  usersApiAsyncController,
  categoriesApiAsyncController,
  postsApiAsyncController,
};
