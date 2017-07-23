const DEFAULT_VISIBLE_PAGES = 5;
const DEFAULT_PAGE = 1;

const usersController = (data) => {
    const utils = require('../utils');

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
        getUserDestinationsView(req, res) {
            const targetUsername = req.params.username;

            return data.users.findUserByUsername(targetUsername)
                .then((user) => {
                    return res
                        .status(200)
                        .render('users/info', {
                            context: {
                                user,
                                current: req.user,
                                isAuthenticated: req.isAuthenticated(),
                            },
                        });
                });
        },
        getUsersView(req, res) {
            const page = req.query.page || DEFAULT_PAGE;
            const size = req.query.size;

            return data.users.getRange(page, size)
                .then((users) => {
                    const pages = utils
                        .getPagination(Number(page), DEFAULT_VISIBLE_PAGES);
                    return res
                        .status(200)
                        .render('users/all', {
                            context: {
                                users,
                                isAuthenticated: req.isAuthenticated(),
                                user: req.user,
                                pages,
                                currentPage: Number(page),
                                pageLink: 'users',
                            },
                        });
                });
        },
    };
};

module.exports = usersController;
