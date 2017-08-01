const homeController = () => {
    return {
        redirectHome(req, res) {
            return res
                .status(302)
                .redirect('/home');
        },
        getHomeView(req, res) {
            return res
                .status(200)
                .render('home', {
                    context: {
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    },
                });
        },
        aboutUs(req, res) {
            return res
                .status(200)
                .render('about');
        },
    };
};

module.exports = homeController;
