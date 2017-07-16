const { Router } = require('express');

const attachRouter = (app, { usersController }) => {
    const router = new Router();
    router
        .get('/register', usersController.getRegisterView)
        .get('/login', usersController.getLoginView)
        .get('/profile', usersController.getProfileView)
        .get('/about', usersController.aboutUs);

    app.use('/', router);
};

module.exports = attachRouter;
