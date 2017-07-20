const { Router } = require('express');

const attachRoutes = (app, { homeController }) => {
    const router = new Router();

    router
        .get('/', homeController.redirectHome)
        .get('/home', homeController.getHomeView)
        .get('/about', homeController.aboutUs);

    app.use('/', router);
};

module.exports = attachRoutes;
