const { Router } = require('express');
const createUsersController = require('../controllers/users-controller');

const attachRoutes = (app, data) => {
    const router = new Router();
    const usersController = createUsersController(data);

    router
        .get('/', usersController.getStartView)
        .get('/home', usersController.getHomeView)
        .get('/destinations', usersController.getDestinationsView)
        .get('/register', usersController.getRegisterView)
        .post('/register', usersController.registerUser)
        .get('/login', usersController.getLoginView)
        .post('/login', usersController.logUser)
        .get('/profile', usersController.getProfileView);

    app.use('/', router);
};

module.exports = attachRoutes;
