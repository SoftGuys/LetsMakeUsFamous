// const passport = require('passport');

const userController = (data) => {
    return {
        getStartView(req, res, errorMessage) {
            res.render('master', {});
        },
        getHomeView(req, res, errorMessage) {
            console.log(req.session);
            res.render('home', { dev: true });
        },
        getDestinationsView(req, res, errorMessage) {
            console.log(req.session);
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
