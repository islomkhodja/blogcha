export const asyncWrapperForController = <T>(contextController): T => {
  const newController: T = {} as T;
  Object.getOwnPropertyNames(Object.getPrototypeOf(contextController))
    .filter(
      (method) =>
        typeof contextController[method] === "function" &&
        method !== "constructor"
    )
    .forEach((handler) => {
      console.log(handler);
      newController[handler] = async function (req, res, next) {
        try {
          const boundHandler = contextController[handler].bind(
            contextController
          );
          return await boundHandler(req, res, next);
        } catch (err) {
          next(err);
        }
      };
    });

  return newController;
};
