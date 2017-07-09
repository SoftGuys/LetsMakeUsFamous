const passport = require('passport');
const { Strategy } = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const configAuth = (server, { users }) => {
    passport.use(new Strategy(
        (username, password, done) => {
            return users.findUserByUsername(username)
                .then((user) => users.validateUserPassword(user, password))
                .then((user) => done(null, user))
                .catch((error) => done(error));
        }
    ));

    server.use(cookieParser());
    server.use(session({
        secret: 'tourist sites',
        maxAge: new Date(Date.now() + 100000),
    }));

    server.use(passport.initialize());
    server.use(passport.session());

    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        return users.findUserById(id)
            .then((user) => done(null, user))
            .catch((error) => done(error));
    });

    // trying to pass the user in the views
    server.use((req, res, next) => {
        res.locals = res.locals || {};

        res.locals.user = req.user;
        next();
    });
};

module.exports = configAuth;
