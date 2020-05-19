const db = require('../lib/db');
const { repositoryFactory } = require('objection-repositories');
let { Categories, CategoriesRepo } = require('./categories')
let { Users, UsersRepo } = require('./users');
let { PostsRepo, Posts } = require('./posts');

CategoriesRepo = repositoryFactory.getCustomRepository(CategoriesRepo, db, Categories);
UsersRepo = repositoryFactory.getCustomRepository(UsersRepo, db, Users);
PostsRepo = repositoryFactory.getCustomRepository(PostsRepo, db, Posts);


module.exports = {
    CategoriesRepo,
    PostsRepo,
    UsersRepo,
}
