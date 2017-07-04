const { Router } = require('express');

const attachRoutes = (app) => {
    const router = new Router();

    router.get('/', (req, res) => {
        res.render('intro', {});
    });

    app.use('/', router);
};

module.exports = attachRoutes;
