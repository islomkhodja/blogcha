export const asyncHandler = (contextController) => (controller) => {
  return async function (req, res, next) {
    try {
      const boundController = controller.bind(contextController);
      return await boundController(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
