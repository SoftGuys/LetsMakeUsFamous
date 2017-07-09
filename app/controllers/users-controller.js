const passport = require('passport');

const userController = (userData) => {
    return {
        getStartView(req, res, errorMessage) {
            res.render('master', {});
        },
        getHomeView(req, res, errorMessage) {
            res.render('home', { dev: true });
        },
        getDestinationsView(req, res, errorMessage) {
            res.render('destinations', {});
        },
        getLoginView(req, res, errorMessage) {
            res.render('login', {});
        },
        getRegisterView(req, res, errorMessage) {
            res.render('register', {});
        },
        registerUser(req, res, errorMessage) {
            const user = req.body;
            userData.add(user);

            res.status(201)
                .redirect('/');
        },
        // logUser(req, res, errorMessage) {
        //     passport.authenticate('local', {
        //         successRedirect: '/',
        //         failureRedirect: '/login',
        //         failureFlash: true,
        //     });
        // },
    };
};

module.exports = userController;
