class UsersService {
  constructor({ UsersRepo }) {
    this.UsersRepo = UsersRepo;
  }

  async getAllUsers() {
    const users = await this.UsersRepo.findWhereNot({ is_deleted: true });
    return users;
  }

  async getUserById(id) {
    const user = await this.UsersRepo.getById(id);
    return user;
  }

  async getUsersCategories(id) {
    try {
      const result = await this.UsersRepo.getWithCategories(id);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getUsersPosts(id) {
    const result = await this.UsersRepo.getWithPosts(id);
    return result;
  }

  async editUser(id, modelOrObject) {
    if (!id) {
      throw new Error("no id!");
    }

    const result = await this.UsersRepo.updateUser(id, modelOrObject);
    return result;
  }

  async addUser(user) {
    return this.UsersRepo.insertUser(user);
  }

  async deleteUser(id) {
    await this.UsersRepo.deleteUser(id);
    return { id, is_deleted: true };
  }
}

exports.UsersService = UsersService;
