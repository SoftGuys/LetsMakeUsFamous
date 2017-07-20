const { Router } = require('express');

const attachRoutes = (app, { authController }) => {
    const router = new Router();

    router
        .post('/register', authController.register)
        .post('/login', authController.login)
        .get('/logout', authController.logout);

    app.use('/users', router);
};

module.exports = attachRoutes;
