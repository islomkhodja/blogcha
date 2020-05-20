const { UsersRepo } = require("./users.repo");
const { Users } = require("./users.model");
const UsersRouter = require("../../routes/users.route");
const { UsersController } = require("./users.controllers");
const { UsersService } = require("./users.service");
module.exports = {
  UsersRepo,
  Users,
  UsersRouter,
  UsersController,
  UsersService,
};
