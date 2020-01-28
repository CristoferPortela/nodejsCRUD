// here we'll put all the routes

module.exports = app => {
    // the users crud route
    app.route('/users')
        .post(app.src.api.user.create) // comming from consig
}