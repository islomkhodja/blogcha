class CategoriesControllers {
  constructor({ categoryService }) {
    this.categoriesService = categoryService;
  }

  async getAll(req, res, next) {
    const categories = await this.categoriesService.getAllCategories();
    return res.json(categories);
  }

  async getOne(req, res, next) {
    const category = await this.categoriesService.getCategoryById(
      req.params.categoryId
    );
    return res.json(category);
  }

  async getCategoryByIdWithPosts(req, res, next) {
    const category = await this.categoriesService.getCategoryByIdWithPosts(
      req.params.categoryId
    );
    return res.json(category);
  }

  async add(req, res, next) {
    const obj = req.body;
    const category = await this.categoriesService.addCategory(obj);
    return res.json(category);
  }

  async edit(req, res, next) {
    const id = req.params.categoryId;
    const obj = req.body;
    const category = await this.categoriesService.editCategory(id, obj);
    return res.json(category);
  }

  async delete(req, res, next) {
    const id = req.params.categoryId;
    const deletedCategory = await this.categoriesService.deleteCategory(id);
    return res.json(deletedCategory);
  }
}

exports.CategoriesControllers = CategoriesControllers;
