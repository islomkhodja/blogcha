class CategoriesService {
  constructor({ CategoriesRepo }) {
    this.CategoriesRepo = CategoriesRepo;
  }

  async getAllCategories() {
    const categories = await this.CategoriesRepo.findWhereNot(
      { is_deleted: true },
      "users(defaultSelects)"
    );
    return categories;
  }

  async getCategoryById(id) {
    const category = await this.CategoriesRepo.getById(id);
    return category;
  }

  async getCategoryByIdWithPosts(id) {
    const category = await this.CategoriesRepo.getByIdWithPosts(id);
    return category;
  }

  async editCategory(id, modelOrObject) {
    if (!id) {
      throw new Error("no id!");
    }

    const result = await this.CategoriesRepo.updateCategory(id, modelOrObject);
    return result;
  }

  async addCategory(user) {
    return this.CategoriesRepo.insertCategory(user);
  }

  async deleteCategory(id) {
    await this.CategoriesRepo.deleteCategory(id);
    return { id, is_deleted: true };
  }
}

exports.CategoriesService = CategoriesService;
