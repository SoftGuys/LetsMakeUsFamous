const passport = require('passport');
const { Strategy } = require('passport-local');

const configAuth = (server, { users }) => {
    server.use(passport.initialize());
    server.use(passport.session());

    passport.use(new Strategy(
        (username, password, done) => {
            return users.findUserByUsername(username)
                .then((user) => users.validateUserPassword(user, password))
                .then((user) => done(null, user))
                .catch((error) => done(error));
        }
    ));

    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        return users.findById(id)
            .then((user) => done(null, user))
            .catch((error) => done(error));
    });
};

module.exports = configAuth;
