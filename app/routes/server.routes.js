const { Router } = require('express');
const createUsersController = require('../controllers/users-controller');


const attachRoutes = (app, data) => {
    const router = new Router();
    const usersController = createUsersController(data);

    router
        .get('/', usersController.getStartView)
        .get('/home', usersController.getHomeView)
        .get('/destinations', usersController.getDestinationsView);

    app.use(router);
};

module.exports = attachRoutes;
