import { PostsRepo } from "./posts.repo";

export class PostsService {
  private postsRepo: PostsRepo;
  constructor({ PostsRepo }) {
    this.postsRepo = PostsRepo;
  }

  async getAllPosts() {
    return await this.postsRepo.findWhereNot(
      { is_deleted: true },
      "[categories, users(defaultSelects)]"
    );
  }

  async getPostById(id) {
    return await this.postsRepo.getById(id);
  }

  async editPost(id, modelOrObject) {
    if (!id) {
      throw new Error("no id!");
    }

    return await this.postsRepo.updatePost(id, modelOrObject);
  }

  async addPost(user) {
    return this.postsRepo.insertPost(user);
  }

  async deletePost(id) {
    await this.postsRepo.deletePost(id);
    return { id, is_deleted: true };
  }
}
