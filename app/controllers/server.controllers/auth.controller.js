const passport = require('passport');
const DEFAULT_PICTURE_URL = '/static/images/default.png';
const RANK_DIVIDER = 10;
const DEFAULT_VISITED_PLACES = 0;
const DEFAULT_BIRTH_DATE = '22/08/1996';
const DEFAULT_CITY = 'Sofia';
const DEFAULT_PHONE_NUMBER = '5554567890';
const DEFAULT_DESCRIPTION = 'No description!';

const authController = (data) => {
    return {
        logout(req, res) {
            req.logout();
            req.toastr.success('You logged out successfully!');

            return res.status(200).redirect('/');
        },
        register(req, res) {
            const user = req.body;
            user.pictureUrl = DEFAULT_PICTURE_URL;
            user.friends = [];
            user.notifications = [];
            user.visitedPlaces = DEFAULT_VISITED_PLACES;

            user.birthDate = DEFAULT_BIRTH_DATE;
            user.city = DEFAULT_CITY;
            user.phoneNumber = DEFAULT_PHONE_NUMBER;
            user.description = DEFAULT_DESCRIPTION;

            return data.landmarks.getAll()
                .then((landmarks) => {
                    user.landmarks = landmarks.map((l) => {
                        return {
                            title: l.title,
                            pictureUrl: l.pictureUrl,
                            isVisited: false,
                        };
                    });

                    user.isAdmin = false;
                    const rankIndex = parseInt(
                        (user.landmarks.length - user.visitedPlaces) /
                        RANK_DIVIDER - 1,
                        10);

                    return Promise.all([
                        data.users.getRankName(rankIndex),
                        user,
                    ]);
                })
                .then(([userRank, userToAdd]) => {
                    userToAdd.rank = userRank;
                    return data.users.add(userToAdd);
                })
                .then((message) => {
                    const resMessage =
                        `${message.ops[0].username} registered successfully`;
                    req.toastr.success(resMessage);

                    return res
                        .status(201)
                        .redirect('/users/login');
                })
                .catch((message) => {
                    req.toastr.error(message);
                    return res
                        .status(406)
                        .redirect('/users/register');
                });
        },
        login(req, res, next) {
            return passport.authenticate('local', (error, user, info) => {
                if (error) {
                    req.toastr.error(error);
                    res.status(404).redirect('/users/login');
                    return next();
                }

                req.logIn(user, (err) => {
                    if (err) {
                        req.toastr.error(err);
                        res.status(404).redirect('/users/login');
                        return next();
                    }

                    req.toastr.success('Hello, ' + user.username + '!');
                    res.status(200).redirect('/');
                    return next();
                });

                return next();
            })(req, res, next);
        },
    };
};

module.exports = authController;
