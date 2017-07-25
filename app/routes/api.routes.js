const { Router } = require('express');

const attachRoutes = (app, { apiController }) => {
    const router = new Router();

    router.get('/areas', apiController.getAreas)
        .get('/landmarks', apiController.getLandmarks)
        .get('/users', apiController.getUsers)
        .post('/destinations/comments/:id', apiController.addDestinationComment)
        .post('/destinations/:id', apiController.verifyVisitedDestinations);

    app.use('/api', router);
};

module.exports = attachRoutes;
