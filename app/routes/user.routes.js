/* globals __dirname path */

// const multer = require('multer');
// const upload = multer({
//     // dest: path.join(__dirname, '../public/images/uploads'),
//     dest: '/static/images/uploads',
// });

const { Router } = require('express');

const attachRouter = (app, { usersController }) => {
    const router = new Router();
    router
        .get('/', usersController.getUsersView)
        .get('/register', usersController.getRegisterView)
        .get('/login', usersController.getLoginView)
        .get('/profile', usersController.getProfileView)
        .post('/profile', usersController.uploadProfilePicture)
        .get('/:username', usersController.getUserDestinationsView)
        .get('/about', usersController.aboutUs);

    app.use('/users', router);
};

module.exports = attachRouter;
