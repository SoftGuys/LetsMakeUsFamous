const Data = require('./abstractions');
const CryptoJS = require('crypto-js');
const COLLECTION_NAME = 'users';

class UsersData extends Data {
    constructor(database) {
        super(database, COLLECTION_NAME);
    }

    findUserByUsername(username) {
        if (typeof username !== 'string') {
            throw new Error('Invalid username!');
        }

        return this.collection.findOne({ username });
    }

    validateUserPassword(user, password) {
        // eslint-disable-next-line new-cap
        if (user.password !== CryptoJS.SHA1(password).toString()) {
            throw new Error('Invalid password!');
        }

        return Promise.resolve(user);
    }

    add(user) {
        if (typeof user === 'undefined') {
            throw new Error('Model is undefined!');
        }

        if (!this.isModelValid(user)) {
            throw new Error('Invalid model for ' + this.collectionName);
        }

        if (user.password !== user.password_confirm) {
            throw new Error('Passwords do not match!');
        }

        delete user.password_confirm;
        // eslint-disable-next-line new-cap
        user.password = CryptoJS.SHA1(user.password).toString();
        return this.collection.insert(user);
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
