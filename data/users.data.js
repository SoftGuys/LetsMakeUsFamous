const Data = require('./abstractions');
const User = require('../models/user.model');

const RANK_DIVISOR = 10;
const USER_RANK_NAMES = [
    'freakpazo',
    'God',
    'Guru',
    'Superuser',
    'Master',
    'Adventure Superhero',
    'Adventure Beast',
    'Seargant',
    'Crunked',
    'Bender',
    'Superstar',
    'Wild Racer',
    'Boyscout',
    'Journey man',
    'Adventurer',
    'Explorer',
    'Local',
    'Enthusiast',
    'Rookie',
    'Amateur',
    'Newbie',
];


class UsersData extends Data {
    constructor(database) {
        super(database, User, User);
    }

    findUserByUsername(username) {
        if (typeof username !== 'string') {
            return Promise.reject('Invalid username!');
        }

        return this.collection.findOne({ username });
    }

    add(user) {
        return this.findUserByUsername(user.username)
            .then((currUser) => {
                if (currUser !== null) {
                    return Promise.reject(
                        'There is already user with such username!');
                }

                return super.add(user);
            });
    }

    updateUserInfo(user) {
        return User.validateUserInfo(user)
            .then(() => {
                return this.update(user);
            });
    }

    promoteToAdmin(user) {
        if (typeof user === 'undefined') {
            return Promise.reject('User is undefined!');
        }

        user.isAdmin = true;
        return this.update(user)
            .then(() => {
                return user;
            });
    }

    getCountByUsername(username) {
        return this.getByUsername(username)
            .then((users) => {
                return users.length;
            });
    }

    getByUsername(username) {
        if (typeof username !== 'string') {
            return Promise.reject('Invalid username');
        }

        const filterExpression = new RegExp(`.*${username}.*`, 'ig');
        return this.collection.find({
                username: {
                    $regex: filterExpression,
                },
            })
            .toArray();
    }

    getSortedByVisitedPlaces(start, size) {
        start = Number(start);
        size = Number(size);

        if (Number.isNaN(start) || Number.isNaN(size)) {
            throw new Error('start and size must be of type number!');
        }

        return this.collection.find()
            .sort({
                visitedPlaces: -1,
            })
            .skip((start - 1) * size)
            .limit(size)
            .toArray();
    }

    validateUserPassword(user, password) {
        return this.validator.validatePassword(user, password);
    }

    updateProfilePicture(user, pictureUrl) {
        if (typeof pictureUrl !== 'string') {
            return Promise.reject('Invalid profile picture url');
        }

        user.pictureUrl = pictureUrl;
        return this.update(user);
    }

    getRankName(rankIndex) {
        return this.validator.validateRank(rankIndex)
            .then((validatedRankIndex) => {
                return USER_RANK_NAMES[validatedRankIndex];
            });
    }

    addFriendship(user, friend) {
        user.friends.push(User.getFriendModel(friend));
        this.update(user);

        friend.notifications.push(`${user.username} added you as a friend!`);
        friend.friends.push(User.getFriendModel(user));
        this.update(friend);
    }

    addChatMessage(user, friend, message) {
        const userRelation = user.friends
            .find((x) => x._id.toString() === friend._id.toString());

        const friendRelation = friend.friends
            .find((x) => x._id.toString() === user._id.toString());

        // eslint-disable-next-line
        if (userRelation === undefined || friendRelation === undefined) {
            return Promise
                .reject('The users must be friends in order to chat!');
        }

        const date = Date.now();
        const messageModel = {
            newMessage: false,
            senderId: user._id,
            pictureUrl: user.pictureUrl,
            username: user.username,
            time: date,
            message,
        };

        userRelation.messages.push(messageModel);
        this.update(user);

        const notification = `${user.username} texted you!`;
        if (!friend.notifications.some((x) => x === notification)) {
            friend.notifications.push(notification);
            messageModel.newMessage = true;
        }

        friendRelation.messages.push(messageModel);
        this.update(friend);

        return Promise.resolve(messageModel);
    }

    markVisitedLandmark(user, landmarkTitle, pictureUrl) {
        if (typeof user === 'undefined') {
            return Promise.reject('User is undefined!');
        }

        if (typeof landmarkTitle !== 'string') {
            return Promise.reject('LandmarkTitle must be a string!');
        }

        const landmark = user.landmarks
            .find((l) => l.title === landmarkTitle);

        if (typeof landmark === 'undefined') {
            return Promise.reject('No such landmark found');
        }

        if (!landmark.isVisited) {
            user.visitedPlaces = Number(user.visitedPlaces) + 1;
            const rankIndex = parseInt((Number(user.landmarks.length) -
                    user.visitedPlaces) / RANK_DIVISOR - 1,
                10);

            if (rankIndex < 0) {
                rankIndex = 0;
            }

            user.rank = USER_RANK_NAMES[rankIndex];
        }

        landmark.isVisited = true;
        landmark.pictureUrl = pictureUrl;

        return this.update(user)
            .then(() => {
                return `${landmarkTitle} has been marked visited!`;
            });
    }
}

module.exports = UsersData;
