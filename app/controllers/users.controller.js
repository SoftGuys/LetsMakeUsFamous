const usersController = (data) => {
    return {
        getLoginView(req, res) {
            if (req.isAuthenticated()) {
                res.status(301).redirect('/');
            } else {
                res.status(200).render('forms/login', {
                    context: {
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    },
                });
            }
        },
        getRegisterView(req, res) {
            if (req.isAuthenticated()) {
                res.status(301).redirect('/');
            } else {
                res.status(200).render('forms/register', {
                    context: {
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    },
                });
            }
        },
        getProfileView(req, res) {
            if (!req.isAuthenticated()) {
                res.status(301).redirect('/home');
            } else {
                res
                    .status(200)
                    .render('profile', {
                        context: {
                            isAuthenticated: req.isAuthenticated(),
                            user: req.user,
                        },
                    });
            }
        },
        uploadProfilePicture(req, res) {
            if (!req.user) {
                return res.status(401)
                    .redirect('/home');
            }

            const pictureUrl = '/static/images/uploads/' + req.file.filename;
            return data.users.updateProfilePicture(req.user, pictureUrl)
                .then(() => {
                    return res.status(201).redirect('/users/profile');
                });
        },
        aboutUs(req, res) {
            return res.status(200).render('about');
        },
        getAll(req, res) {
            return data.users.getAll()
                .then((users) => {
                    return res
                        .status(200)
                        .render('users', {
                            context: {
                                users,
                                isAuthenticated: req.isAuthenticated(),
                                user: req.user,
                            },
                        });
                });
        },
        getUserDestinationsView(req, res) {
            const targetUsername = req.params.username;

            return data.users.findUserByUsername(targetUsername)
                .then((user) => {
                    return res
                        .status(200)
                        .render('users/info', {
                            context: {
                                user,
                                isAuthenticated: req.isAuthenticated(),
                            },
                        });
                });
        },
        getUsersView(req, res) {
            return data.users.getAll()
                .then((users) => {
                    return res
                        .status(200)
                        .render('users/all', {
                            context: {
                                users,
                                isAuthenticated: req.isAuthenticated(),
                                user: req.user,
                            },
                        });
                });
        },
    };
};

module.exports = usersController;
