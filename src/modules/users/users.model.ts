import { Model, ValidationError } from "objection";

export default class Users extends Model {
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

  $beforeInsert() {
    if (this.id) {
      throw new ValidationError({
        message: "identifier should not be defined before insert",
        type: "MyCustomError",
      });
    }

    if (!this.name) {
      throw new ValidationError({
        message: "identifier should be defined before insert",
        type: "MyCustomError",
      });
    }

    if (!this.email) {
      throw new ValidationError({
        message: "identifier should be defined before insert",
        type: "MyCustomError",
      });
    }

    if (!this.bio) {
      throw new ValidationError({
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
        name: { type: "string" },
        email: { type: "string" },
        bio: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        is_deleted: { type: "boolean" },
      },
    };
  }

  static get relationMappings() {
    const Posts = require("../posts/posts.model");
    const Categories = require("../categories/categories.model").Categories;
    return {
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
  }
}
