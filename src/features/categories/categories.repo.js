const { EntityRepository } = require("objection-repositories");

exports.CategoriesRepo = class CategoriesRepo extends EntityRepository {
  // custom logic
  getById(id) {
    return this.model
      .query()
      .findById(id)
      .whereNot("is_deleted", true)
      .withGraphFetched("users(defaultSelects)");
  }

  updateCategory(id, user) {
    return this.model.query().updateAndFetchById(id, user);
  }

  insertCategory(user) {
    return this.model.query().insertAndFetch(user);
  }

  deleteCategory(id) {
    return this.model
      .query()
      .update({
        is_deleted: true,
      })
      .where("id", id);
  }
};
