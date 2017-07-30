const { Router } = require('express');

const attachRouter = (app, { userController, usersPresentationController }) => {
    const router = new Router();
    router
        .get('/', usersPresentationController.getUsersView)
        .get('/ranking', usersPresentationController.getRankingView)
        .get('/register', userController.getRegisterView)
        .get('/login', userController.getLoginView)
        .get('/messages', userController.getMessagesView)
        .get('/profile', userController.getProfileView)
        .post('/profile', userController.uploadProfilePicture)
        .get('/:username', userController.getUserDestinationsView);

    app.use('/users', router);
};

module.exports = attachRouter;
