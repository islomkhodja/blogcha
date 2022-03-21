import { Model, ValidationError } from "objection";
import { Users } from "../users";

export class Categories extends Model {
  id;
  title;
  created_at;
  created_by;
  is_deleted;

  static get tableName() {
    return "categories";
  }

  static get idColumn() {
    return "id";
  }

  $beforeInsert() {
    if (this.id) {
      throw new ValidationError({
        message: "identifier should not be defined before insert",
        type: "MyCustomError",
      });
    }

    if (!this.title) {
      throw new ValidationError({
        message: "identifier should be defined before insert",
        type: "MyCustomError",
      });
    }

    if (!this.created_by) {
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
        title: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        created_by: { type: "integer" },
        is_deleted: { type: "boolean" },
      },
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: "categories.created_by",
          to: "users.id",
        },
      },
    };
  }
}
