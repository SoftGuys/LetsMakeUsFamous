const userController = (data) => {
    return {
        getStartView(req, res, errorMessage) {
            res.render('master', {});
        },

        getHomeView(req, res, errorMessage) {
            res.render('home', { dev: true });
        },
        getDestinationsView(req, res, errorMessage) {
            res.render('destinations', {});
        },
        getLoginView(req, res, errorMessage) {
            res.render('login', {});
        },
        getRegisterView(req, res, errorMessage) {
            res.render('register', {});
        },
    };
};

module.exports = userController;
