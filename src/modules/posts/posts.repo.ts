import { EntityRepository } from "../../lib/repository";

export class PostsRepo extends EntityRepository {
  // custom logic
  getById(id) {
    return this.model
      .query()
      .findById(id)
      .whereNot("is_deleted", true)
      .withGraphFetched("[categories, users(defaultSelects)]");
  }

  updatePost(id, post) {
    console.log(id);
    post.id = +id;
    return this.model.query().updateAndFetchById(id, post);
  }

  insertPost(post) {
    return this.model.query().insertAndFetch(post);
  }

  deletePost(id) {
    return this.model
      .query()
      .update({
        is_deleted: true,
      })
      .where("id", id);
  }
}
