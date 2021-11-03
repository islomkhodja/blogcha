class PostsService {
  constructor({ PostsRepo }) {
    this.PostRepo = PostsRepo;
  }

  async getAllPosts() {
    return await this.PostRepo.findWhereNot(
      { is_deleted: true },
      "[categories, users(defaultSelects)]"
    );
  }

  async getPostById(id) {
    return await this.PostRepo.getById(id);
  }

  async editPost(id, modelOrObject) {
    if (!id) {
      throw new Error("no id!");
    }

    return await this.PostRepo.updatePost(id, modelOrObject);
  }

  async addPost(user) {
    return this.PostRepo.insertPost(user);
  }

  async deletePost(id) {
    await this.PostRepo.deletePost(id);
    return { id, is_deleted: true };
  }
}

exports.PostsService = PostsService;
