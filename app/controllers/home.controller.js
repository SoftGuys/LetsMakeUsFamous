const homeController = (data) => {
    return {
        getHomeView(req, res, errorMessage) {
            res.render('home', { dev: true });
        },
    };
};

module.exports = homeController;
