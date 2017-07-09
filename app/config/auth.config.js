const { Strategy } = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const configAuth = (server, userData) => {
    server.use(cookieParser());
    server.use(session({
        secret: 'bobidjei',
    }));

    server.use(passport.initialize());
    server.use(passport.session());
    // server.use(flash()); setup later

    passport.use(new Strategy(
        (username, password, done) => {
            return userData.findUserByUsername(username)
                .then((user) => userData.validateUserPassword(user, password))
                .then((user) => done(null, user))
                .catch((error) => done(error));
        }
    ));

    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        return userData.findById(id)
            .then((user) => done(null, user))
            .catch((error) => done(error));
    });
};

module.exports = configAuth;
