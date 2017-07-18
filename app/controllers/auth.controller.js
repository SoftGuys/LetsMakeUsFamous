const passport = require('passport');

const authController = (data) => {
    return {
        logout(req, res) {
            req.logout();
            req.toastr.success('You logged out successfully!');

            return res.status(200).redirect('/');
        },
        registerUser(req, res, errorMessage) {
            const user = req.body;
            return data.users.add(user)
                .then((message) => {
                    req.toastr.success(message);
                    res.status(201).redirect('/');
                })
                .catch((message) => {
                    req.toastr.error(message);
                    res.status(406).redirect('/register');
                });
        },
        logUser(req, res, errorMessage) {
            return passport.authenticate('local', (error, user, info) => {
                if (error) {
                    console.log(error);
                    req.toastr.error(error);
                    res.status(404).redirect('/login');
                } else {
                    req.toastr.success('Hello, ' + user.username + '!');
                    res.status(200).redirect('/');
                }
            })(req, res, errorMessage);
        },
        logFacebook(req, res, errorMessage) {
            return passport.authenticate('facebook', {
                scope: ['user_friends', 'manage_pages'],
            })(req, res, errorMessage);
        },
    };
};

module.exports = authController;
