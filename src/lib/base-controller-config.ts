import { HTTPMethod } from "./http-methods";
import { NextFunction } from "express";

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
