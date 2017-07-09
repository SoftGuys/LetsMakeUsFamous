const passport = require('passport');

const userController = (data) => {
    return {
        getStartView(req, res, errorMessage) {
            res.render('master', {});
        },
        getHomeView(req, res, errorMessage) {
            res.render('home', {dev: true});
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
            res.render('login', {});
        },
        getRegisterView(req, res, errorMessage) {
            res.render('register', {});
        },
        registerUser(req, res, errorMessage) {
            const user = req.body;
            data.users.add(user);

            res.status(201)
                .redirect('/');
        },
        getProfileView(req, res, errorMessage){
            // let username, imageUrl;
            // console.log(req.session);
            //
            // if (req.isAuthenticated()) {
            //     username = req.user.image ? req.user.username : "newuser";
            //     imageUrl = '/static/images/profile' + username + '.jpg';
            // }
            //
            // let result = {
            //     username: req.user.username,
            //     image: req.user.image,
            //     isAuthenticated: req.isAuthenticated(),
            //     user: req.user
            // };
            //
            // console.log(result)
            res.render('profile', {});
        },


        // logUser(req, res, errorMessage) {
        //     passport.authenticate('local', {
        //         successRedirect: '/',
        //         failureRedirect: '/login',
        //         failureFlash: true,
        //     });
        // },

        logUser(req, res, errorMessage) {
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true,
            })(req, res, errorMessage);
        }

    };
};

module.exports = userController;
