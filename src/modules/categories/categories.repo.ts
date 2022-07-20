import { EntityRepository } from "../../lib/repository";

export class CategoriesRepo extends EntityRepository {
  // custom logic
  getById(id) {
    return this.model
      .query()
      .findById(id)
      .whereNot("is_deleted", true)
      .withGraphFetched("users(defaultSelects)");
  }

  getByIdWithPosts(id) {
    return this.model
      .query()
      .findById(id)
      .whereNot("is_deleted", true)
      .withGraphFetched("posts");
  }

  updateCategory(id, category) {
    category.id = +id;
    return this.model.query().updateAndFetchById(id, category);
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
}
