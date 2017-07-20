const DEFAULT_VISIBLE_PAGES = 5;
const DEFAULT_PAGE = 1;

const usersController = (data) => {
    const utils = require('../utils');

    return {
        getLoginView(req, res, errorMessage) {
            if (req.isAuthenticated()) {
                res.redirect('/');
            } else {
                res.render('forms/login', {});
            }
        },
        getRegisterView(req, res, errorMessage) {
            if (req.isAuthenticated()) {
                res.redirect('/');
            } else {
                res.render('forms/register', {});
            }
        },
        getProfileView(req, res, errorMessage) {
            if (!req.isAuthenticated()) {
                return res.redirect('/home');
            }

            return res.render('profile', {
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
            });
        },
        uploadProfilePicture(req, res) {
            if (!req.user) {
                return res.status(401)
                    .redirect('/home');
            }

            const pictureUrl = '/static/images/uploads/' + req.file.filename;
            return data.users.updateProfilePicture(req.user, pictureUrl)
                .then(() => {
                    return res.redirect('/profile');
                });
        },
        aboutUs(req, res) {
            return res.render('about');
        },
        getAll(req, res) {
            return data.users.getAll()
                .then((users) => {
                    return res.render('users', {
                        model: users,
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    });
                });
        },
        getUserDestinationsView(req, res) {
            const targetUsername = req.params.username;

            return data.users.findUserByUsername(targetUsername)
                .then((user) => {
                    return res.render('users/info', {
                        model: user,
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
                    console.log(pages);
                    return res.render('users/all', {
                        model: {
                            users,
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
