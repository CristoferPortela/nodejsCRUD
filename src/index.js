'use strict'
const app = require('express')()
// consign will possibility us to seperate the files easier
const consign = require('consign')
// the knex config
const env = require('./config/env')

// add the knex to app, so the knex will be avaible in knex
app.env = env

consign({ cwd: 'src' })
    .then('config/middleware.js')
    .then('api/validation.js')
    .then('api')
    .then('config/routes.js')
    .into(app)

// port to execute
const port = 2727

app.listen(port, () => console.log(`listen on ${port}`));