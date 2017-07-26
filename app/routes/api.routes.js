const { Router } = require('express');

const attachRoutes = (app, { apiController }) => {
    const router = new Router();

    router.get('/areas', apiController.getAreas)
        .get('/landmarks', apiController.getLandmarks)
        .get('/users', apiController.getUsers)
        .post('/destinations/comments/:id',
            apiController.addDestinationComment)
        .delete('/destinations/comments/:id',
            apiController.deleteDestinationComment)
        .put('/profile', apiController.editProfile);

    app.use('/api', router);
};

module.exports = attachRoutes;
