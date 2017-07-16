const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');

const messages = require('express-messages');
const flash = require('connect-flash');

const configApp = (app) => {
    app.set('view engine', 'pug');
    // app.use(morgan('combined'));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(cookieParser());
    app.use(session({
        saveUninitialized: true,
        resave: false,
        secret: 'bobidjei',
    }));

    app.use(flash());
    app.use((req, res, next) => {
        res.locals.messages = messages(req, res);
        next();
    });
};

module.exports = configApp;
