const { Users } = require("../users/users.model");
const { Model } = require("objection");

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

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "body", "category_id", "created_by"],

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

  static relationMappings = {
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: Users,
      join: {
        from: "posts.created_by",
        to: "users.id",
      },
    },
  };
}

module.exports = Posts;

exports.Posts = Posts;
