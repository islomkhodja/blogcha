class UsersControllers {
  constructor({ usersService }) {
    this.usersService = usersService;
  }

  async getAll(req, res, next) {
    try {
      const users = await this.usersService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const user = await this.usersService.getUserById(req.params.userId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async getUsersCategories(req, res, next) {
    try {
      const id = req.params.userId;
      const usersWithCategories = await this.usersService.getUsersCategories(
        id
      );
      return res.json(usersWithCategories);
    } catch (err) {
      next(err);
    }
  }

  async getUsersPosts(req, res, next) {
    try {
      const id = req.params.userId;
      const usersWithPosts = await this.usersService.getUsersPosts(id);
      return res.json(usersWithPosts);
    } catch (err) {
      next(err);
    }
  }

  async add(req, res, next) {
    try {
      const obj = req.body;
      const user = await this.usersService.addUser(obj);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async edit(req, res, next) {
    try {
      const id = req.params.userId;
      const obj = req.body;
      const user = await this.usersService.editUser(id, obj);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.userId;
      const deletedUser = await this.usersService.deleteUser(id);
      res.json(deletedUser);
    } catch (err) {
      next(err);
    }
  }
}

exports.UsersController = UsersControllers;
