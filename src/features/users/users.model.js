const { Model } = require('objection');

export class Users extends Model {
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'id';
    }
}
