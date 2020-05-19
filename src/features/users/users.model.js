const { Model } = require("objection");
const { Categories } = require("../categories/categories.model");
const { Posts } = require("../posts/posts.model");

exports.Users = class Users extends Model {
  id;
  name;
  email;
  bio;
  created_at;
  is_deleted;

  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "name", "bio");
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "bio"],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        email: { type: "string" },
        bio: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        is_deleted: { type: "boolean" },
      },
    };
  }

  static relationMappings = {
    categories: {
      relation: Model.HasManyRelation,
      modelClass: Categories,
      join: {
        from: "users.id",
        to: "categories.created_by",
      },
    },
    posts: {
      relation: Model.HasManyRelation,
      modelClass: Posts,
      join: {
        from: "users.id",
        to: "posts.created_by",
      },
    },
  };
};
