const { CategoriesRepo } = require("./categories.repo");
const { Categories } = require("./categories.model");
const { CategoriesService } = require("./categories.service");
const { CategoriesControllers } = require("./categories.controllers");
module.exports = {
  CategoriesRepo,
  Categories,
  CategoriesControllers,
  CategoriesService,
};
