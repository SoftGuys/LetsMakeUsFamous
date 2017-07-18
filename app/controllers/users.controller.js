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
            res.render('forms/register', {});
        },
        getProfileView(req, res, errorMessage) {
            if (!req.isAuthenticated()) {
                return res.redirect('/home');
            }

            const username = req.user.image ?
                req.user.username :
                '/newuser';
            const imageUrl = '/static/images/profile/' + 'dp' + '.jpg';
            const result = {
                username: req.user.username,
                email: req.user.email,
                image: imageUrl,
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
            };
            return res.render('profile', { result });
        },
        uploadProfilePicture(req, res) {
            // const photo = req.file;
            res.redirect('/profile');
        },
        aboutUs(req, res) {
            return res.render('about');
        },
        getAll(req, res) {
            data.users.getAll()
                .then((users) => {
                    return res.render('users', {
                        model: users,
                    });
                });
        },
    };
};

module.exports = usersController;
