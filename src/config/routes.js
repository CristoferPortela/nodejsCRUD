// here we'll put all the routes

module.exports = app => {
    const api = app.api
    // the users crud route
    app.route('/users')
        .post(api.user.create) // comming from consig
        .get(api.user.get)
    
    app.route('/users/:id')
        .put(api.user.create)
        .get(api.user.getById)
}