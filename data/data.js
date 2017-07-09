const LandmarksData = require('./landmarks.data');
const UsersData = require('./users.data');
const AreasData = require('./areas.data');

const init = (database) => {
    return Promise.resolve({
        users: new UsersData(database),
        areas: new AreasData(database),
        landmarks: new LandmarksData(database),
    });
};

module.exports = init;
