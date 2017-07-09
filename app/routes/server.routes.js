const { Router } = require('express');
const createUsersController = require('../controllers/users-controller');
const passport = require('passport');

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
        .post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        }))
        .get('/profile',usersController.getProfileView);


    app.use('/', router);
};

module.exports = attachRoutes;
