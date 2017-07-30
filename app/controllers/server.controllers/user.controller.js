const userController = (data, utils) => {
    return {
        getLoginView(req, res) {
            if (req.isAuthenticated()) {
                return res
                    .status(301)
                    .redirect('/');
            }

            return res
                .status(200)
                .render('forms/login', {
                    context: {
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    },
                });
        },
        getRegisterView(req, res) {
            if (req.isAuthenticated()) {
                return res
                    .status(301)
                    .redirect('/');
            }

            return res
                .status(200)
                .render('forms/register', {
                    context: {
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    },
                });
        },
        getProfileView(req, res) {
            if (!req.isAuthenticated()) {
                return res
                    .status(301)
                    .redirect('/home');
            }

            return res
                .status(200)
                .render('users/profile', {
                    context: {
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    },
                });
        },
        uploadProfilePicture(req, res) {
            if (!req.user) {
                return res
                    .status(401)
                    .redirect('/home');
            }

            const pictureUrl = '/static/images/uploads/' + req.file.filename;
            return data.users.updateProfilePicture(req.user, pictureUrl)
                .then(() => {
                    req.toastr.success('Successfully changed profile picture!');

                    return res
                        .status(201)
                        .redirect('/users/profile');
                })
                .catch((error) => {
                    req.toastr.error(error);

                    return res
                        .status(400)
                        .redirect('/users/profile');
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
                                current: user,
                                user: req.user,
                                isAuthenticated: req.isAuthenticated(),
                            },
                        });
                });
        },
        getMessagesView(req, res) {
            if (!req.isAuthenticated()) {
                return res
                    .status(401)
                    .redirect('/');
            }

            const context = {
                user: req.user,
                isAuthenticated: req.isAuthenticated(),
                friend: '',
            };

            if (req.query.user) {
                context.friend = req.query.user;
            }

            return res
                .status(200)
                .render('messages', { context });
        },
    };
};

module.exports = userController;
