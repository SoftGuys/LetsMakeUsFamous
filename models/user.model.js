const CryptoJS = require('crypto-js');

const MIN_RANK_NUMBER = 0;
const MAX_RANK_NUMBER = 20;

class User {
    static validateModel(user) {
        const isUserValid =
            typeof user !== 'undefined' &&
            typeof user.username === 'string' &&
            typeof user.password === 'string' &&
            typeof user.email === 'string' &&
            user.username.match(/^\w{3,20}$/g) &&
            user.password.match(/^\w{4,20}$/g) &&
            user.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/g);

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

    static validateUserInfo(user) {
        if (typeof user.birthDate !== 'string' ||
            // eslint-disable-next-line
            !/^(0?[1-9]|[12][0-9]|3[01])[-.\/](0?[1-9]|1[012])[-.\/]\d{2,4}$/g.test(user.birthDate)) {
            return Promise.reject('Invalid birth date!');
        } else if (typeof user.city !== 'string' ||
            !/^[A-Z]{1}[a-z]{2,15}$/g.test(user.city)) {
            return Promise.reject(
                'City name must be valid and begin with capital letter!');
        } else if (typeof user.email !== 'string' ||
            !/^[^@\s]+@[^@\s]+\.[^@\s]+$/g.test(user.email)) {
            return Promise.reject('Invalid email!');
        } else if (Number.isNaN(+user.phoneNumber) ||
            !/^[0-9]{10}$/g.test(user.phoneNumber)) {
            return Promise.reject('Phone number must be valid 10 digits!');
        } else if (typeof user.description !== 'string' ||
            !/^[\w!.?, ]{3,20}$/g.test(user.description)) {
            return Promise.reject(
                'Description must be between 3 and 20 characters' +
                ' and contain numbers letters and punctuation only!');
        }

        return Promise.resolve(user);
    }

    static getFriendModel(userData) {
        return {
            _id: userData._id,
            username: userData.username,
            rank: userData.rank,
            email: userData.email,
            pictureUrl: userData.pictureUrl,
            messages: [],
        };
    }
}

module.exports = User;
