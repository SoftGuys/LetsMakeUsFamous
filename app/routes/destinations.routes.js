const { Router } = require('express');

const attachRoutes = (app, { destinationsController }) => {
    const router = new Router();

    router.get('/', destinationsController.getDestinationsView);

    app.use('/destinations', router);
};

module.exports = attachRoutes;
