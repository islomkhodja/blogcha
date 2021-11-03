class CategoriesService {
  constructor({ CategoriesRepo }) {
    this.CategoriesRepo = CategoriesRepo;
  }

  async getAllCategories() {
    return await this.CategoriesRepo.findWhereNot(
      { is_deleted: true },
      "users(defaultSelects)"
    );
  }

  async getCategoryById(id) {
    return await this.CategoriesRepo.getById(id);
  }

  async getCategoryByIdWithPosts(id) {
    return await this.CategoriesRepo.getByIdWithPosts(id);
  }

  async editCategory(id, modelOrObject) {
    if (!id) {
      throw new Error("no id!");
    }

    return await this.CategoriesRepo.updateCategory(id, modelOrObject);
  }

  async addCategory(user) {
    return await this.CategoriesRepo.insertCategory(user);
  }

  async deleteCategory(id) {
    await this.CategoriesRepo.deleteCategory(id);
    return { id, is_deleted: true };
  }
}

exports.CategoriesService = CategoriesService;
