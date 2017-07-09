const passport = require('passport');
const { Strategy } = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const configAuth = (server, userData) => {
    passport.use(new Strategy(
        (username, password, done) => {
            return userData.findUserByUsername(username)
                .then((user) => userData.validateUserPassword(user, password))
                .then((user) => done(null, user))
                .catch((error) => done(error));
        }
    ));

    server.use(cookieParser());
    server.use(session({ secret: 'sedemte rilski laina' }));
    server.use(passport.initialize());
    server.use(passport.session());

    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        return userData.findUserById(id)
            .then((user) => done(null, user))
            .catch((error) => done(error));
    });
};

module.exports = configAuth;
