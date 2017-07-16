const { Router } = require('express');
const createUsersController = require('../controllers/users-controller');
const createAuthorizationController = require('../controllers/auth-controller');

const attachRoutes = (app, data) => {
    const router = new Router();
    const usersController = createUsersController(data);
    const authController = createAuthorizationController(data);

    router
        .get('/', usersController.getStartView)
        .get('/home', usersController.getHomeView)
        .get('/destinations', usersController.getDestinationsView)
        .get('/register', usersController.getRegisterView)
        .post('/register', usersController.registerUser)
        .get('/login', usersController.getLoginView)
        .post('/login', usersController.logUser)
        .get('/auth/facebook', usersController.logFacebook)
        .get('/profile', usersController.getProfileView)
        .post('/logout', authController.logout)
        .get('/about', authController.aboutUs);

    app.use('/', router);
};

module.exports = attachRoutes;
