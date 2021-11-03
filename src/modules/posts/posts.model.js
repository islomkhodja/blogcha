const objection = require("objection");
const Model = objection.Model;

class Posts extends Model {
  id;
  title;
  body;
  category_id;
  created_at;
  created_by;
  is_deleted;

  static get tableName() {
    return "posts";
  }

  static get idColumn() {
    return "id";
  }

  $beforeInsert() {
    if (this.id) {
      throw new objection.ValidationError({
        message: "identifier should not be defined before insert",
        type: "MyCustomError",
      });
    }

    if (!this.title) {
      throw new objection.ValidationError({
        message: "title identifier should be defined before insert",
        type: "MyCustomError",
      });
    }

    if (!this.body) {
      throw new objection.ValidationError({
        message: "body identifier should be defined before insert",
        type: "MyCustomError",
      });
    }

    if (!this.category_id) {
      throw new objection.ValidationError({
        message: "category_id identifier should be defined before insert",
        type: "MyCustomError",
      });
    }

    if (!this.created_by) {
      throw new objection.ValidationError({
        message: "identifier should be defined before insert",
        type: "MyCustomError",
      });
    }
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        body: { type: "string" },
        category_id: { type: "integer" },
        created_at: { type: "string", format: "date-time" },
        created_by: { type: "integer" },
        is_deleted: { type: "boolean" },
      },
    };
  }

  static get relationMappings() {
    const { Users } = require("../users");
    const { Categories } = require("../categories");
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: "posts.created_by",
          to: "users.id",
        },
      },
      categories: {
        relation: Model.BelongsToOneRelation,
        modelClass: Categories,
        join: {
          from: "posts.category_id",
          to: "categories.id",
        },
      },
    };
  }
}

module.exports = Posts;

exports.Posts = Posts;
