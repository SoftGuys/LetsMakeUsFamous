const { Router } = require('express');

const attachRouter = (app, { usersController }) => {
    const router = new Router();
    router
        .get('/', usersController.getUsersView)
        .get('/register', usersController.getRegisterView)
        .get('/login', usersController.getLoginView)
        .get('/profile', usersController.getProfileView)
        .post('/profile', usersController.uploadProfilePicture)
        .get('/messages', usersController.getMessagesView)
        .get('/:username', usersController.getUserDestinationsView);

    app.use('/users', router);
};

module.exports = attachRouter;
