const { Router } = require('express');

const attachRoutes = (app, { apiController }) => {
    const router = new Router();

    router.get('/areas', apiController.getAreas);
    router.get('/landmarks', apiController.getLandmarks);
    router.get('/users', apiController.getUsers);

    app.use('/api', router);
};

module.exports = attachRoutes;
