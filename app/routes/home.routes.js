const { Router } = require('express');

const attachRoutes = (app, { homeController }) => {
    const router = new Router();

    router
        .get('/', homeController.redirectHome)
        .get('/home', homeController.getHomeView);

    app.use('/', router);
};

module.exports = attachRoutes;
