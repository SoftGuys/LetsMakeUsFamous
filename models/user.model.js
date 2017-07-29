const MIN_RANK_NUMBER = 0;
const MAX_RANK_NUMBER = 20;

const CryptoJS = require('crypto-js');

class User {
    static validateModel(user) {
        const isUserValid = typeof user !== 'undefined' &&
            typeof user.username === 'string' &&
            typeof user.password === 'string' &&
            user.username.match(/^\w{3,20}$/g) &&
            user.password.match(/^\w{4,20}$/g);

        if (!isUserValid) {
            return Promise.reject('Incorrect username or password characters!');
        }

        if (user.password !== user.password_confirm) {
            return Promise.reject('Passwords do not match!');
        }

        delete user.password_confirm;
        // eslint-disable-next-line
        user.password = CryptoJS.SHA1(user.password).toString();
        return Promise.resolve(user);
    }

    static validateRank(rankIndex) {
        if (Number.isNaN(Number(rankIndex))) {
            return Promise.reject('rank must be a valid number!');
        }

        if (rankIndex < MIN_RANK_NUMBER || rankIndex > MAX_RANK_NUMBER) {
            return Promise.reject('Invalid rank range!');
        }

        return Promise.resolve(Number(rankIndex));
    }

    static validatePassword(user, password) {
        if (user === null) {
            return Promise.reject('Invalid user!');
        }

        // eslint-disable-next-line new-cap
        if (user.password !== CryptoJS.SHA1(password).toString()) {
            return Promise.reject('Invalid password!');
        }

        return Promise.resolve(user);
    }
}

module.exports = User;
