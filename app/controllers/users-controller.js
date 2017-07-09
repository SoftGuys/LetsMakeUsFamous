const passport = require('passport');

const userController = (data) => {
    return {
        getStartView(req, res, errorMessage) {
            let result = {
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            };
            res.render('master',{result} );
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
            if (req.isAuthenticated()) {
                //You are already logged in
            }
            else{
                res.render(res.render('login',{}))
            }
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
        getProfileView(req, res, errorMessage) {
            if (!req.isAuthenticated()) {
                //You are not Logged
            }
            else {
                let username, imageUrl;
                console.log(req.session);
                (req.isAuthenticated())
                username = req.user.image ? req.user.username : "/newuser";
                imageUrl = '/static/images/profile' + username + '.jpg';
                console.log(imageUrl);
                let result = {
                    username: req.user.username,
                    image: imageUrl,
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user
                };
                console.log(result)
                res.render('profile', {result});
            }
        },
        logUser(req, res, errorMessage) {
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true,
            })(req, res, errorMessage);
        },
    };
};

module.exports = userController;
