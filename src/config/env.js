const env = require('../../knexfile')
const knex = require('knex')(env)

// knex.migrate.latest([env])
module.exports = knex