const LandmarksData = require('./landmarks.data');
const AreasData = require('./areas.data');

const init = (database) => {
    return Promise.resolve({
        sites: new LandmarksData(database),
        areas: new AreasData(database),
    });
};

module.exports = init;
