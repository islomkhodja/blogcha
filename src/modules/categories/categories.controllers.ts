import { NextFunction } from "express";
import { HTTPMethod } from "../../lib/http-methods";
import auth from "../../middlewares";
import { CategoriesService } from "./categories.service";
import { PostsService } from "../posts";

export interface RouteHandler {
  method: HTTPMethod;
  beforeMiddleware?: Array<
    (req: Express.Request, res: Express.Response, next?: NextFunction) => void
  >;
  afterMiddleware?: Array<
    (req: Express.Request, res: Express.Response, next?: NextFunction) => void
  >;
  handler(
    req: Express.Request,
    res: Express.Response,
    next?: NextFunction
  ): any;
}

export interface ApplicationRouterSettings {
  [route: string]: RouteHandler | RouteHandler[];
}

export interface AppController {
  routerSettings(): ApplicationRouterSettings;
}

export class CategoriesControllers implements AppController {
  private categoriesService: CategoriesService;
  private postService: PostsService;

  constructor({
    categoryService,
    postService,
  }: {
    categoryService: CategoriesService;
    postService: PostsService;
  }) {
    this.categoriesService = categoryService;
    this.postService = postService;
  }

  routerSettings(): ApplicationRouterSettings {
    return {
      "/categories": [
        {
          method: HTTPMethod.GET,
          beforeMiddleware: [auth],
          afterMiddleware: [],
          handler: this.getAll,
        },
        {
          method: HTTPMethod.POST,
          beforeMiddleware: [],
          afterMiddleware: [],
          handler: this.add,
        },
      ],
      "/categories/:categoryId": [
        {
          method: HTTPMethod.GET,
          beforeMiddleware: [],
          afterMiddleware: [],
          handler: this.getOne,
        },
        {
          method: HTTPMethod.DELETE,
          beforeMiddleware: [],
          afterMiddleware: [],
          handler: this.delete,
        },
        {
          method: HTTPMethod.PUT,
          beforeMiddleware: [auth],
          afterMiddleware: [],
          handler: this.edit,
        },
      ],
      "/categories/:categoryId/posts": {
        method: HTTPMethod.GET,
        beforeMiddleware: [],
        afterMiddleware: [],
        handler: this.getCategoryByIdWithPosts,
      },
    };
  }

  async getAll(req, res, next) {
    const categories = await this.categoriesService.getAllCategories();
    return res.json(categories);
  }

  async getOne(req, res, next) {
    const category = await this.categoriesService.getCategoryById(
      req.params.categoryId
    );
    return res.json(category);
  }

  async getCategoryByIdWithPosts(req, res, next) {
    const category = await this.categoriesService.getCategoryByIdWithPosts(
      req.params.categoryId
    );
    return res.json(category);
  }

  async add(req, res, next) {
    const obj = req.body;
    const category = await this.categoriesService.addCategory(obj);
    return res.json(category);
  }

  async edit(req, res, next) {
    const id = req.params.categoryId;
    const obj = req.body;
    const category = await this.categoriesService.editCategory(id, obj);
    return res.json(category);
  }

  async delete(req, res, next) {
    const id = req.params.categoryId;
    const deletedCategory = await this.categoriesService.deleteCategory(id);
    return res.json(deletedCategory);
  }
}
