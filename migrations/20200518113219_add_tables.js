exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('name');
        table.string('email');
        table.text('bio');
        table.dateTime('created_at');
        table.boolean('is_deleted');
    })

    await knex.schema.createTable('categories', (table) => {
        table.increments('id')
        table.string('title');
        table.dateTime('created_at');
        table.integer('created_by').references('id').inTable('users');
        table.boolean('is_deleted');
    })

    await knex.schema.createTable('posts', (table) => {
        table.increments('id')
        table.string('title');
        table.text('body');
        table.integer('category_id').references('id').inTable('categories');
        table.dateTime('created_at');
        table.integer('created_by').references('id').inTable('users');
        table.boolean('is_deleted');
    })
}


exports.down = async function(knex) {
    await knex.schema.dropTable('users');
    await knex.schema.dropTable('categories');
    await knex.schema.dropTable('posts');
};
