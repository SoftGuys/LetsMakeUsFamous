require('./polyfills');
require('./models/extensions');

const { selectors } = require('./selectors');
const { parseAreas } = require('./parsers/area.parser');
const fileSystem = require('fs');

parseAreas(selectors.BASE_URL)
    .then((data) => {
        fileSystem.writeFileSync('result.json', JSON.stringify(data));
    });
