/* globals __dirname */
const path = require('path');

const express = require('express');
const app = express();

const init = (data) => {
    require('./config/app.config')(app);
    require('./config/auth.config')(app, data);

    app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
    app.use('/static', express.static(path.join(__dirname, '../public')));
    app.use('/dist', express.static(path.join(__dirname, '../build')));

    const utils = require('./utils');
    const controllers = require('./controllers')(data, utils);
    require('./routes')(app, controllers);

    app.get('/404', (req, res) => {
        return res
            .status(404)
            .render('404', {
                context: {
                    user: req.user,
                    isAuthenticated: req.isAuthenticated(),
                },
            });
    });

    app.get('/*', (req, res) => {
        return res
            .status(301)
            .redirect('/404');
    });

    const sockets = require('./sockets');
    const server = require('./config/socket.config')(app, data, sockets);

    return Promise.resolve(server);
};

module.exports = init;
