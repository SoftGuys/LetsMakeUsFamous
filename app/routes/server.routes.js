const router = require('express').Router(),
    createUsersController = require("../../controllers/users-controller");


module.exports = (app, data) => {
    const usersController = createUsersController(data);

    router
        .get('/', usersController.getStartView)
        .get('/home',usersController.getHomeView)

    app.use(router);
}
