const { Router } = require('express');

const attachRoutes = (app, { homeController }) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return res
                .status(304)
                .redirect('/home');
        })
        .get('/home', homeController.getHomeView);

    app.use('/', router);
};

module.exports = attachRoutes;
