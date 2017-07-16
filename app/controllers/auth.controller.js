const passport = require('passport');

const authController = (data) => {
    return {
        logout(req, res) {
            req.logout();
            return res.status(304)
                .redirect('/');
        },
        registerUser(req, res, errorMessage) {
            const user = req.body;
            data.users.add(user);

            return res.status(201)
                .redirect('/');
        },
        logUser(req, res, errorMessage) {
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true,
            })(req, res, errorMessage);
        },
        logFacebook(req, res, errorMessage) {
            passport.authenticate('facebook', {
                scope: ['user_friends', 'manage_pages'],
            })(req, res, errorMessage);
        },
    };
};

module.exports = authController;
