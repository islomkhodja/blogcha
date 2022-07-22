export const asyncWrapperForController = <T>(contextController): T => {
  const newController: T = {} as T;
  Object.getOwnPropertyNames(Object.getPrototypeOf(contextController))
    .filter(
      (method) =>
        typeof contextController[method] === "function" &&
        !["constructor"].includes(method)
    )
    .forEach((handler) => {
      if (handler === "routerSettings") {
        newController[handler] = contextController[handler];
        return;
      }
      newController[handler] = tryCatchedHandler(
        contextController[handler],
        contextController
      );
    });

  return newController;
};

export const tryCatchedHandler = (handler, controller) => {
  return async function (req, res, next) {
    try {
      const boundHandler = handler.bind(controller);
      return await boundHandler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
