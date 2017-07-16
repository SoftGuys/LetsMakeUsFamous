const { Router } = require('express');

const attachRoutes = (app, controllers) => {
    const router = new Router();

    router
        .get('/', controllers.homeController.getStartView)
        .get('/home', controllers.homeController.getHomeView)
        .get('/destinations', controllers.usersController.getDestinationsView)
        .get('/register', controllers.usersController.getRegisterView)
        .post('/register', controllers.authController.registerUser)
        .get('/login', controllers.usersController.getLoginView)
        .post('/login', controllers.authController.logUser)
        .get('/auth/facebook', controllers.authController.logFacebook)
        .get('/profile', controllers.usersController.getProfileView)
        .post('/logout', controllers.authController.logout)
        .get('/about', controllers.authController.aboutUs);

    app.use('/', router);
};

module.exports = attachRoutes;
