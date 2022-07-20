import { NotFoundError } from "../errors/NotFoundError";

const _ = require("lodash");
const validationUtils = require("validation-utils").validationHelper;

class EntityRepository {
  private knex: any;
  private model: any;
  private idColumn: any;

  constructor(knex, model) {
    validationUtils.notNil(knex, "Knex instance is mandatory");
    validationUtils.notNil(model, "Model is mandatory");
    _validateIsModel(model);

    this.knex = knex;
    this.model = model;
    this.idColumn = model.idColumn;
  }

  fromJson(attributeValues?) {
    return this.model.fromJson(attributeValues);
  }

  create(entity?, trx?) {
    //Keep the input parameter immutable
    const instanceDto = _.cloneDeep(entity);
    //ToDo implement pre-persistence hooks
    return this.model.query(trx || this.knex).insert(instanceDto);
  }

  async update(entity?, trx?) {
    //Keep the input parameter immutable
    const entityDto = _.cloneDeep(entity);

    const identityClause = {};

    if (Array.isArray(this.idColumn)) {
      this.idColumn.forEach(
        (idColumn) => (identityClause[idColumn] = entityDto[idColumn])
      );
    } else {
      identityClause[this.idColumn] = entityDto[this.idColumn];
    }

    //ToDo implement pre-persistence hooks
    const modifiedEntitiesCount = await this.model
      .query(trx || this.knex)
      .update(entityDto)
      .where(identityClause);

    if (modifiedEntitiesCount === 0) {
      throw new NotFoundError(entityDto[this.idColumn]);
    }
    return modifiedEntitiesCount;
  }

  updateAndFetch(entity?, trx?) {
    //Keep the input parameter immutable
    const entityDto = _.cloneDeep(entity);
    //ToDo implement pre-persistence hooks
    return this.model
      .query(trx || this.knex)
      .updateAndFetchById(entityDto[this.idColumn], entityDto);
  }

  find(attributeValues = {}, withRelations?) {
    if (_.isArray(withRelations)) {
      withRelations = `[${_.join(withRelations)}]`;
    }

    return this.model
      .query(this.knex)
      .where(attributeValues)
      .withGraphFetched(withRelations);
    //ToDo implement post-retrieval hooks
  }

  findWhereNot(attributeValues = {}, withRelations?) {
    if (_.isArray(withRelations)) {
      withRelations = `[${_.join(withRelations)}]`;
    }

    return this.model
      .query(this.knex)
      .whereNot(attributeValues)
      .withGraphFetched(withRelations);
    //ToDo implement post-retrieval hooks
  }

  findWhereIn(searchParam?, attributeValues?, withRelations?) {
    if (Array.isArray(withRelations)) {
      withRelations = `[${_.join(withRelations)}]`;
    }
    if (_.isString(searchParam)) {
      return this.model
        .query(this.knex)
        .whereIn(searchParam, attributeValues)
        .withGraphFetched(withRelations);
    } else {
      const builder = this.model
        .query(this.knex)
        .withGraphFetched(withRelations);
      _.forOwn(searchParam, (value, key) => {
        if (Array.isArray(value)) {
          builder.whereIn(key, value);
        } else {
          builder.where(key, value);
        }
      });
      return builder;
    }

    //ToDo implement post-retrieval hooks
  }

  async findOne(attributeValues = {}, withRelations?) {
    const results = await this.find(attributeValues, withRelations);
    return results[0] || null;
  }

  findOneById(id, withRelations?) {
    return this.findOne({ [this.idColumn]: id }, withRelations);
  }

  deleteBy(attributeValues?, trx?) {
    return this.model
      .query(trx || this.knex)
      .delete()
      .where(attributeValues);
  }

  deleteById(id?, trx?) {
    return this.deleteBy({ [this.idColumn]: id }, trx);
  }
}

//This is only invoked on the startup, so we can make this check non-trivial
function _validateIsModel(model) {
  let parentClass = Object.getPrototypeOf(model);
  while (parentClass.name !== "Model" && parentClass.name !== "") {
    parentClass = Object.getPrototypeOf(parentClass);
  }
  validationUtils.booleanTrue(
    parentClass.name === "Model",
    "Parameter is not an Objection.js model"
  );
}

module.exports = EntityRepository;
