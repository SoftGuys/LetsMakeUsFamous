class User {
    static isValidModel(model) {
        return typeof model !== 'undefined' &&
            typeof model.username === 'string' &&
            typeof model.password === 'string' &&
            model.username.match(/^\w{6,20}$/g) &&
            model.password.match(/^\w{10,20}$/g);
    }
}

module.exports = User;
