const { Router } = require('express');

const attachRoutes = (app, { usersApiController }) => {
    const router = new Router();

    router.get('/areas', usersApiController.getAreas);

    app.use('/api', router);
};

module.exports = attachRoutes;
