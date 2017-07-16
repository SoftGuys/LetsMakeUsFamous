const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = '126214034647722';
const FACEBOOK_APP_SECRET = 'c1d76677a97828d49016ef9904b325c4';

const configAuth = (server, { users }) => {
    server.use(passport.initialize());
    server.use(passport.session());

    passport.use(new LocalStrategy(
        (username, password, done) => {
            return users.findUserByUsername(username)
                .then((user) => users.validateUserPassword(user, password))
                .then((user) => done(null, user))
                .catch((error) => done(error));
        }
    ));

    // passport.use(new FacebookStrategy({
    //         clientID: FACEBOOK_APP_ID,
    //         clientSecret: FACEBOOK_APP_SECRET,
    //         callbackURL: 'http://localhost:3001/auth/facebook',
    //         profileFields: [
    //             'id',
    //             'email',
    //             'gender',
    //             'link',
    //             'locale',
    //             'name',
    //             'displayName',
    //             'timezone',
    //             'updated_time',
    //             'verified',
    //         ],
    //     },
    //     (accessToken, refreshToken, profile, done) => {
    //         users.findAll({ 'facebookId': profile.id }, (err, user) => {
    //             if (err) {
    //                 return done(err);
    //             }

    //             return done(null, user);
    //         });
    //     }));

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
