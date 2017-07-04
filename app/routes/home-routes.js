const { Router } = require('express');

const homeRoute = (app) => {
    const router = new Router();


    router.get('/home', (req, res) => {
        res.render('home', {});
    });

    app.use('/', router);
};

module.exports = homeRoute;
