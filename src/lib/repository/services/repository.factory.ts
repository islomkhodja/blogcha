const _ = require("lodash");
import { validateInheritsFrom } from 'validation-utils'

const EntityRepository = require("./entity.repository");

function _getRepository(knex, entityModel) {
  return new EntityRepository(knex, entityModel);
}

const memoizedGetRepository = _.memoize(_getRepository, (knex, entityModel) => {
  return `${knex.client.config.connection.host}/${knex.client.config.connection.database}/${entityModel.name}`;
});

function getRepository(knex, entityModel) {
  return memoizedGetRepository(knex, entityModel);
}

function _getCustomRepository(RepositoryClass) {
  return new RepositoryClass(..._getArgumentsExceptFirst(arguments));
}

function _getArgumentsExceptFirst(args) {
  const slicedArgs = [];
  for (let i = 1; i < args.length; i++) {
    slicedArgs.push(args[i]);
  }
  return slicedArgs;
}

const memoizedGetCustomRepository = _.memoize(
  _getCustomRepository,
  (RepositoryClass, knex, entityModel) => {
    return `${knex.client.config.connection.host}/${knex.client.config.connection.database}/${entityModel.name}`;
  }
);

function getCustomRepository(RepositoryClass, knex, entityModel) {
  validateInheritsFrom(
    RepositoryClass,
    EntityRepository,
    "Custom repository class must inherit from EntityRepository"
  );
  return memoizedGetCustomRepository(...arguments);
}

module.exports = {
  getRepository,
  getCustomRepository,
};
