const router = require('express').Router(),
    createUsersController = require("../../controllers/users-controller");


module.exports = (app, data) => {
    const usersController = createUsersController(data);

    router
        .get('/', usersController.getStartView)
        .get('/home', usersController.getHomeView)
        .get('/destinations', usersController.getDestinationsView)
        .get('/register', usersController.getRegisterView)
        .get('/login',usersController.getLoginView)


    app.use(router);
}
