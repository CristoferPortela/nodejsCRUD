// Update with your config settings.

module.exports = {

    client: 'postgresql',
    connection: {
      database: 'inifinity',
      user:     'postgres',
      password: 'senhaincorreta'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
}
