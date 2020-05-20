const { EntityRepository } = require("objection-repositories");

exports.CategoriesRepo = class CategoriesRepo extends EntityRepository {
  // custom logic
  getById(id) {
    return this.model.query().findById(id);
  }
};
