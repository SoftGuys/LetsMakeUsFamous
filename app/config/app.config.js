/* globals __dirname */

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const multer = require('multer');
const morgan = require('morgan');
const path = require('path');

const messages = require('express-messages');
const flash = require('connect-flash');
const toastr = require('express-toastr');

const config = require('../../config');

const configApp = (app) => {
    app.set('view engine', 'pug');
    // app.use(morgan('combined'));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(cookieParser());
    app.use(session({
        store: new MongoStore({ url: config.LOCAL_CONNECTION_STRING }),
        saveUninitialized: true,
        resave: false,
        secret: 'bobidjei',
    }));

    app.use(flash());
    app.use((req, res, next) => {
        res.locals.messages = messages(req, res);
        next();
    });

    app.use(toastr());
    app.use((req, res, next) => {
        res.locals.toasts = req.toastr.render;
        next();
    });

    app.use(multer({
        storage: multer.diskStorage({
            filename: (_, file, callback) => {
                callback(null, Date.now() + '.jpg');
            },
            destination: (_, file, callback) => {
                callback(null,
                    path.join(__dirname, '../../public/images/uploads/'));
            },
        }),
    }).single('avatar'));
};

module.exports = configApp;
