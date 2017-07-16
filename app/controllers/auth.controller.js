const passport = require('passport');

const authController = (data) => {
    return {
        logout(req, res) {
            req.logout().flash('info', 'User logged out successfully!');
            return res.status(304).redirect('/');
        },
        registerUser(req, res, errorMessage) {
            const user = req.body;
            data.users.add(user);

            req.flash('info', 'User registered successfully!');
            return res.status(201).redirect('/');
        },
        logUser(req, res, errorMessage) {
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
                successFlash: 'Successfully logged!',
                failureFlash: 'Incorrect username or password!',
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
