const { Model } = require("objection");

export class Categories extends Model {
  static get tableName() {
    return "categories";
  }

  static get idColumn() {
    return "id";
  }
}
