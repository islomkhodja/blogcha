export class UsersControllers {
  private usersService: any;

  constructor({ usersService }) {
    this.usersService = usersService;
  }

  async getAll(req, res, next) {
    const users = await this.usersService.getAllUsers();
    res.json(users);
  }

  async getOne(req, res, next) {
    const user = await this.usersService.getUserById(req.params.userId);
    res.json(user);
  }

  async getUsersCategories(req, res, next) {
    const id = req.params.userId;
    const usersWithCategories = await this.usersService.getUsersCategories(id);
    return res.json(usersWithCategories);
  }

  async getUsersPosts(req, res, next) {
    const id = req.params.userId;
    const usersWithPosts = await this.usersService.getUsersPosts(id);
    return res.json(usersWithPosts);
  }

  async add(req, res, next) {
    const obj = req.body;
    const user = await this.usersService.addUser(obj);
    res.json(user);
  }

  async edit(req, res, next) {
    const id = req.params.userId;
    const obj = req.body;
    const user = await this.usersService.editUser(id, obj);
    res.json(user);
  }

  async delete(req, res, next) {
    const id = req.params.userId;
    const deletedUser = await this.usersService.deleteUser(id);
    res.json(deletedUser);
  }
}
