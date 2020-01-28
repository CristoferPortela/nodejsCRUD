//this module is gonna make the users crud
// the app is comming from express app in src/index.js

module.exports = app => {
    const create = (req, res) => {
        res.send('usuário salvo')
    }
    return { create }
}