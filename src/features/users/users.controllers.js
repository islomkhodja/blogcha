class UsersControllers {
  constructor({ usersService }) {
    this.usersService = usersService;
  }

  async getAll(req, res, next) {
    try {
      console.log(this);
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

  getUsersCategories(req, res, next) {
    try {
      const id = req.params.userId;
      this.usersService.getUsersCategories(id);
    } catch (err) {
      next(err);
    }
  }

  getUsersPosts(req, res, next) {
    try {
      const id = req.params.userId;
      this.usersService.getUsersPosts(id);
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
