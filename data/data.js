const LandmarksData = require('./landmarks.data');
const UsersData = require('./users.data');

const init = (database) => {
    return Promise.resolve({
        landmarks: new LandmarksData(database),
        users: new UsersData(database),
    });
};

module.exports = init;
