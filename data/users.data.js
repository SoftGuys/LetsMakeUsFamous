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

    addFriendship(firstUser, secondUser) {
        const userMaker = (userData) => {
            return {
                _id: userData._id,
                username: userData.username,
                rank: userData.rank,
                email: userData.email,
                pictureUrl: userData.pictureUrl,
            };
        };

        firstUser.friends.push(userMaker(secondUser));
        this.collection.update({
            _id: firstUser._id,
        }, firstUser);

        secondUser.friends.push(userMaker(firstUser));
        this.collection.update({
            _id: secondUser._id,
        }, secondUser);
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

    isModelValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.username === 'string' &&
            typeof model.password === 'string' &&
            model.username.match(/^\w{3,20}$/g) &&
            model.password.match(/^\w{4,20}$/g);
    }
}

module.exports = UsersData;
