const express = require('express');
const app = express();

const init = (data) => {
    require('./config/app.config')(app);
    require('./routes')(app, data);

    return Promise.resolve(app);
};

module.exports = init;
