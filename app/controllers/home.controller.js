const homeController = (data) => {
    return {
        getHomeView(req, res, errorMessage) {
            res.render('home', { dev: true });
        },
        getStartView(req, res, errorMessage) {
            const result = {
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
            };

            res.render('master', { result });
        },
    };
};

module.exports = homeController;
