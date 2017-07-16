const passport = require('passport');

const userController = (data) => {
    return {
        getStartView(req, res, errorMessage) {
            const result = {
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
            };
            res.render('master', { result });
        },

        getHomeView(req, res, errorMessage) {
            res.render('home', { dev: true });
        },

        getDestinationsView(req, res, errorMessage) {
            data.areas.getAll()
                .then((areas) => {
                    return res.render('destinations', {
                        model: areas,
                    });
                });
        },

        getLoginView(req, res, errorMessage) {
            if (req.isAuthenticated()) {
                // You are already logged in
            } else {
                res.render(res.render('forms/login', {}));
            }
        },

        getRegisterView(req, res, errorMessage) {
            res.render('forms/register', {});
        },

        registerUser(req, res, errorMessage) {
            const user = req.body;
            data.users.add(user);

            res.status(201)
                .redirect('/');
        },

        getProfileView(req, res, errorMessage) {
            if (!req.isAuthenticated()) {
                return res.redirect('/home');
            }

            const username = req.user.image ?
                req.user.username :
                '/newuser';
            const imageUrl = '/static/images/profile' + username + '.jpg';
            console.log(imageUrl);
            const result = {
                username: req.user.username,
                image: imageUrl,
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
            };

            return res.render('profile', { result });
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

module.exports = userController;
