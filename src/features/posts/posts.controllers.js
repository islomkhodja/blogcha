class PostsControllers {
  constructor({ postService }) {
    this.postService = postService;
  }

  async getAll(req, res, next) {
    try {
      console.log("sdfsdf");
      const posts = await this.postService.getAllPosts();
      console.log(posts);
      res.json(posts);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const post = await this.postService.getPostById(req.params.postId);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  async add(req, res, next) {
    try {
      const obj = req.body;
      const post = await this.postService.addPost(obj);
      res.json(post);
    } catch (err) {
      next(err);
    }
  }

  async edit(req, res, next) {
    try {
      const id = req.params.postId;
      const obj = req.body;
      const post = await this.postService.editPost(id, obj);
      res.json(post);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.postId;
      const deletedPost = await this.postService.deletePost(id);
      res.json(deletedPost);
    } catch (err) {
      next(err);
    }
  }
}

exports.PostsControllers = PostsControllers;
