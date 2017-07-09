const { Router } = require('express');

const attachRoutes = (app, data) => {
    const router = new Router();
    const usersApiController =
        require('../controllers/users.api.controller')(data);

    router.get('/areas', usersApiController.getAreas);

    app.use('/api', router);
};

module.exports = attachRoutes;
