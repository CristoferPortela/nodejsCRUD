'use strict'
const app = require('express')()
const consign = require('consign')

consign()
    .then('src/config/middleware.js')
    .then('src/api')
    .then('src/config/routes.js')
    .into(app)

// port to execute
const port = 2727

app.listen(port, () => console.log(`listen on ${port}`));