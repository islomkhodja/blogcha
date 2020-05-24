class PostsService {
  constructor({ PostsRepo }) {
    this.PostRepo = PostsRepo;
  }

  async getAllPosts() {
    const posts = await this.PostRepo.findWhereNot(
      { is_deleted: true },
      "[categories, users(defaultSelects)]"
    );
    return posts;
  }

  async getPostById(id) {
    const post = await this.PostRepo.getById(id);
    return post;
  }

  async editPost(id, modelOrObject) {
    if (!id) {
      throw new Error("no id!");
    }

    const result = await this.PostRepo.updatePost(id, modelOrObject);
    return result;
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
