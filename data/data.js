const LandmarksData = require('./landmarks.data');
const AreasData = require('./areas.data');

const init = (database) => {
    return Promise.resolve({
        areas: new AreasData(database),
        landmarks: new LandmarksData(database),
    });
};

module.exports = init;
