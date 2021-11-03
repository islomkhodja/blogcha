class UsersService {
  constructor({ UsersRepo }) {
    this.UsersRepo = UsersRepo;
  }

  async getAllUsers() {
    return await this.UsersRepo.findWhereNot({ is_deleted: true });
  }

  async getUserById(id) {
    return await this.UsersRepo.getById(id);
  }

  async getUsersCategories(id) {
    try {
      return await this.UsersRepo.getWithCategories(id);
    } catch (err) {
      throw err;
    }
  }

  async getUsersPosts(id) {
    return await this.UsersRepo.getWithPosts(id);
  }

  async editUser(id, modelOrObject) {
    if (!id) {
      throw new Error("no id!");
    }

    return await this.UsersRepo.updateUser(id, modelOrObject);
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
