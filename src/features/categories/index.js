const { CategoriesRepo } = require("./categories.repo");
const { Categories } = require("./categories.model");
const CategoriesRouter = require("../../routes/categories.routes");
const { CategoriesService } = require("./categories.service");
const { CategoriesControllers } = require("./categories.controllers");
module.exports = {
  CategoriesRepo,
  Categories,
  CategoriesControllers,
  CategoriesRouter,
  CategoriesService,
};
