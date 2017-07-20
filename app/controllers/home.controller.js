const homeController = (data) => {
    return {
        redirectHome(req, res) {
            return res
                .status(301)
                .redirect('/home');
        },
        getHomeView(req, res) {
            return res
                .status(200)
                .render('home', {
                    context: {
                        dev: true,
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    },
                });
        },
    };
};

module.exports = homeController;
