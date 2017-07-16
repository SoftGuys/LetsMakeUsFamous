const { Router } = require('express');

const attachRoutes = (app, controllers) => {
    const router = new Router();
    router.get('/areas', controllers.usersApiController.getAreas);

    app.use('/api', router);
};

module.exports = attachRoutes;
