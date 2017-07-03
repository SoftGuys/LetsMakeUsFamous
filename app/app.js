const express = require('express');

const app = express();

const init = () => {
    require('./config/app.config')(app);
    require('./routes')(app);
};

init();

module.exports = app;
