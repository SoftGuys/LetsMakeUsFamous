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
        return Promise.resolve(user);
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
