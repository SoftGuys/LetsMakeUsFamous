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
        .get('/register', usersController.getRegisterView)
        .get('/login', usersController.getLoginView)
        .get('/profile', usersController.getProfileView)
        .get('/about', usersController.aboutUs)
        .get('/users', usersController.getAll)
        .post('/profile', usersController.uploadProfilePicture);

    app.use('/', router);
};

module.exports = attachRouter;
