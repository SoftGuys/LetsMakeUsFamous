const { Router } = require('express');

const attachRoutes = (app, {
    usersApiController,
    commentsApiController,
    destinationsApiController,
}) => {
    const router = new Router();

    router
        .get('/landmarks', destinationsApiController.getLandmarks)
        .get('/users', usersApiController.getUsers)
        .put('/users/:id/admin', usersApiController.promoteUserToAdmin)
        .post('/destinations/comments/:id',
            commentsApiController.addDestinationComment)
        .delete('/destinations/comments/:id',
            commentsApiController.deleteDestinationComment)
        .put('/destinations/comments/:id',
            commentsApiController.editDestinationComment)
        .put('/profile', usersApiController.editProfile);

    app.use('/api', router);
};

module.exports = attachRoutes;
