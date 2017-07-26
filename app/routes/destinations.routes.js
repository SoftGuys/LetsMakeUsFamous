const { Router } = require('express');

const attachRoutes = (app, { destinationsController }) => {
    const router = new Router();

    router
        .get('/:id/map', destinationsController.showMap)
        .get('/', destinationsController.getDestinationsView)
        .get('/:id', destinationsController.getDestinationDetailsView)
        .post('/:id', destinationsController.verifyVisitedDestinations);

    app.use('/destinations', router);
};

module.exports = attachRoutes;
