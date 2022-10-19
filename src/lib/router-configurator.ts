import { Router } from "express";
import {AppController, RouteHandler} from "./base-controller-config";

const setToRoute = <T>(route, router, handlerObject, controller: T) => {
  const { method, beforeMiddleware, afterMiddleware, handler } = handlerObject;
  router[method.toLowerCase()](
    route,
    ...beforeMiddleware,
    async (req, res, next) => {
      try {
        const boundHandler = handler.bind(controller);
        return await boundHandler(req, res, next);
      } catch (err) {
        next(err);
      }
    },
    ...afterMiddleware
  );
};

export const routerConfigurationForController = <T extends AppController>(
  controller: T,
  router: Router
) => {
  const routerSettings = controller.routerSettings();
  Object.keys(routerSettings).forEach((path) => {
    const routeHandlers = routerSettings[path];
    if (Array.isArray(routeHandlers)) {
      for (let routeHandlerObject of routeHandlers as RouteHandler[]) {
        setToRoute(path, router, routeHandlerObject, controller);
      }
    } else {
      setToRoute(path, router, routeHandlers, controller);
    }
  });
};
