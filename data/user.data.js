const Data = require('./abstractions');
const COLLECTION_NAME = 'users';

class UsersData extends Data {
    constructor(database) {
        super(database, COLLECTION_NAME);
    }

    findUserByUsername() {

    }

    findUserById() {

    }

    isModelValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.username === 'string' &&
            typeof model.password === 'string' &&
            model.username.match(/^\w{6,20}$/g) &&
            model.password.match(/^\w{10,20}$/g);
    }
}

module.exports = UsersData;
