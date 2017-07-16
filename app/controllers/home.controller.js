const homeController = (data) => {
    return {
        getHomeView(req, res, errorMessage) {
            res.render('home', { dev: true,
                                req: req.isAuthenticated(),
                                user: req.user });
        },
    };
};

module.exports = homeController;
