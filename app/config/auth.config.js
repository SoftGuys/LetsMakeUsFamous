// const passport = require('passport');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const { Strategy } = require('passport-local');

// const { MongoClient } = require('mongodb');
// const MongoStore = require('connect-mongo')(session);

// const getSession = () => {
//     return session({
//         secret: 'Purple Unicorn',
//         maxAge: new Date(Date.now() + 1000),
//     });

//     /** Disabled mongo session (bug when users are not persistent **/
//     // return session({
//     //     secret: 'Purple Unicorn',
//     //     maxAge: new Date(Date.now() + 1000),
//     //     store: new MongoStore({ db }, (err) => {
//     //         // eslint-ignore-next-line no-console
//     //         console.log(err || 'connect-mongodb setup ok');
//     //     }),
//     // });
// };


// const configAuth = (app, { users }) => {
//     return MongoClient.connect('mongodb://localhost/items-auth')
//         .then((db) => {
//             passport.use(new Strategy(
//                 (username, password, done) => {
//                     return users.signIn(username, password)
//                         .then((user) => {
//                             return done(null, user);
//                         })
//                         .catch((err) => {
//                             return done(err);
//                         });
//                 }
//             ));

//             app.use(cookieParser());
//             app.use(getSession());

//             app.use(passport.initialize());
//             app.use(passport.session());

//             passport.serializeUser((user, done) => {
//                 done(null, user.id);
//             });

//             passport.deserializeUser((id, done) => {
//                 return users.findById(id)
//                     .then((user) => {
//                         done(null, user);
//                     })
//                     .catch(done);
//             });

//             // User can be referenced from views
//             app.use((req, res, next) => {
//                 res.locals = res.locals || {};

//                 res.locals.user = req.user;
//                 next();
//             });
//         });
// };

// module.exports = configAuth;
