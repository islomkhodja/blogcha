const { EntityRepository } = require("objection-repositories");

exports.UsersRepo = class UsersRepo extends EntityRepository {
  getById(id) {
    return this.model.query().findById(id).whereNot("is_deleted", true);
  }

  async getWithCategories(id) {
    return this.model.query().findById(id).withGraphFetched("categories");
  }

  async getWithPosts(id) {
    return this.model.query().findById(id).withGraphFetched("posts");
  }

  updateUser(id, user) {
    return this.model.query().updateAndFetchById(id, user);
  }

  insertUser(user) {
    return this.model.query().insertAndFetch(user);
  }

  deleteUser(id) {
    return this.model
      .query()
      .update({
        is_deleted: true,
      })
      .where("id", id);
  }
};
