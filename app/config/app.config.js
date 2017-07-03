const morgan = require('morgan');
const bodyParser = require('body-parser');

const configApp = (app) => {
    app.set('view engine', 'pug');
    app.use(morgan('combined'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};

module.exports = configApp;
