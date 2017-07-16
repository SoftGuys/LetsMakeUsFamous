const { Router } = require('express');

const attachRoutes = (app, { authController }) => {
    const router = new Router();

    router
        .get('/login/facebook', authController.logFacebook)
        .post('/register', authController.registerUser)
        .post('/login', authController.logUser)
        .get('/logout', authController.logout);

    app.use('/', router);
};

module.exports = attachRoutes;
