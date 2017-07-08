const { Router } = require('express');
const createUsersController = require('../controllers/users-controller');


const attachRoutes = (app, data) => {
    const router = new Router();
    const usersController = createUsersController(data);

    router
        .get('/', usersController.getStartView)
        .get('/home', usersController.getHomeView)
<<<<<<< HEAD
        .get('/destinations', usersController.getDestinationsView);
=======
        .get('/destinations', usersController.getDestinationsView)
        .get('/register', usersController.getRegisterView)
        .get('/login',usersController.getLoginView)

>>>>>>> 0170cb44d04dc9b7e317a1719a8293109de250d5

    app.use(router);
};

module.exports = attachRoutes;
