export class PostsApiControllers {
  private postService: any;
  constructor({ postService }) {
    this.postService = postService;
  }

  async getAll(req, res, next) {
    const posts = await this.postService.getAllPosts();
    res.json(posts);
  }

  async getOne(req, res, next) {
    const post = await this.postService.getPostById(req.params.postId);
    res.json(post);
  }

  async add(req, res, next) {
    const obj = req.body;
    const post = await this.postService.addPost(obj);
    res.json(post);
  }

  async edit(req, res, next) {
    const id = req.params.postId;
    const obj = req.body;
    const post = await this.postService.editPost(id, obj);
    res.json(post);
  }

  async delete(req, res, next) {
    const id = req.params.postId;
    const deletedPost = await this.postService.deletePost(id);
    res.json(deletedPost);
  }
}
