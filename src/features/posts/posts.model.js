const { Model } = require('objection');

export class Posts extends Model {
    static get tableName() {
        return 'posts';
    }

    static get idColumn() {
        return 'id';
    }



}
