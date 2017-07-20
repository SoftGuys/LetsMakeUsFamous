const usersController = (data) => {
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
            // const photo = req.file;
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
            data.users.getAll()
                .then((users) => {
                    return res.render('users', {
                        model: users,
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    });
                });
        },
    };
};

module.exports = usersController;
