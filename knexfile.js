// Update with your config settings.

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './blog-admin.sqlite3'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
