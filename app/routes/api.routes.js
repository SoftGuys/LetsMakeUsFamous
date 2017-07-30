const { Router } = require('express');

const attachRoutes = (app, {
    usersApiController,
    destinationsApiController,
}) => {
    const router = new Router();

    router
        .get('/users', usersApiController.getUsers)
        .put('/users/:id/admin', usersApiController.promoteUserToAdmin)
        .put('/profile', usersApiController.editProfile)
        .get('/destinations', destinationsApiController.getDestinations)
        .post('/destinations/comments/:id',
            destinationsApiController.addDestinationComment)
        .put('/destinations/comments/:id',
            destinationsApiController.editDestinationComment)
        .delete('/destinations/comments/:id',
            destinationsApiController.deleteDestinationComment);

    app.use('/api', router);
};

module.exports = attachRoutes;
