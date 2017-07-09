const LandmarksData = require('./landmarks.data');
const UsersData = require('./users.data');
const AreasData = require('./areas.data');

const init = (database) => {
    return Promise.resolve({
        landmarks: new LandmarksData(database),
        users: new UsersData(database),
        areas: new AreasData(database),
    });
};

module.exports = init;
