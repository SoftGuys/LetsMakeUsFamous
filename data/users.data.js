const Data = require('./abstractions');
const CryptoJS = require('crypto-js');
const COLLECTION_NAME = 'users';

class UsersData extends Data {
    constructor(database) {
        super(database, COLLECTION_NAME);
    }

    findUserByUsername(username) {
        if (typeof username !== 'string') {
            return Promise.reject('Invalid username!');
        }

        return this.collection.findOne({ username });
    }

    validateUserPassword(user, password) {
        if (user === null) {
            return Promise.reject('Invalid user!');
        }

        // eslint-disable-next-line new-cap
        if (user.password !== CryptoJS.SHA1(password).toString()) {
            return Promise.reject('Invalid password!');
        }

        return Promise.resolve(user);
    }

    updateProfilePicture(user, pictureUrl) {
        if (typeof pictureUrl !== 'string') {
            return Promise.reject('Invalid profile picture url');
        }

        user.pictureUrl = pictureUrl;
        return this.collection.update({
            _id: user._id,
        }, user);
    }

    addFriendship(user, friend) {
        const friendModel = (userData) => {
            return {
                _id: userData._id,
                username: userData.username,
                rank: userData.rank,
                email: userData.email,
                pictureUrl: userData.pictureUrl,
                messages: [],
            };
        };

        user.friends.push(friendModel(friend));
        this.update(user);

        friend.notifications.push(`${user.username} added you as a friend!`);
        friend.friends.push(friendModel(user));
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

        const date = new Date();
        const messageModel = {
            senderId: user._id,
            pictureUrl: user.pictureUrl,
            username: user.username,
            time: date.getHours() + ':' + date.getMinutes(),
            message,
        };

        userRelation.messages.push(messageModel);
        this.update(user);

        friendRelation.messages.push(messageModel);
        this.update(friend);

        return Promise.resolve(messageModel);
    }

    add(user) {
        if (typeof user === 'undefined') {
            return Promise.reject('Model is undefined!');
        }

        if (!this.isModelValid(user)) {
            return Promise.reject('Incorrect username or password characters!');
        }

        if (user.password !== user.password_confirm) {
            return Promise.reject('Passwords do not match!');
        }

        delete user.password_confirm;
        // eslint-disable-next-line new-cap
        user.password = CryptoJS.SHA1(user.password).toString();
        return this.collection.insert(user)
            .then((userInfo) => {
                const username = userInfo.ops[0].username;
                return username + ' registered successfully!';
            });
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
            console.log('must not show');
            user.visitedPlaces = Number(user.visitedPlaces) + 1;
        }

        landmark.isVisited = true;
        landmark.pictureUrl = pictureUrl;

        return this.collection.update({
                _id: user._id,
            }, user)
            .then(() => {
                return `${landmarkTitle} has been marked visited!`;
            });
    }

    isModelValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.username === 'string' &&
            typeof model.password === 'string' &&
            model.username.match(/^\w{3,20}$/g) &&
            model.password.match(/^\w{4,20}$/g);
    }
}

module.exports = UsersData;
