const bp = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bp.json())
    app.use(cors())
}