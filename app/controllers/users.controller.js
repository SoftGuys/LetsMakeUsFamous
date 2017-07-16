const usersController = (data) => {
    return {
        getLoginView(req, res, errorMessage) {
            if (req.isAuthenticated()) {
                // You are already logged in
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
            const imageUrl = '/static/images/profile' + username + '.jpg';
            const result = {
                username: req.user.username,
                image: imageUrl,
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
            };

            return res.render('profile', { result });
        },
        aboutUs(req, res) {
            return res.render('about');
        },
    };
};

module.exports = usersController;
