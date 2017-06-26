require('./polyfills');
require('./models/extensions');

const { Selectors } = require('./selectors');
const { parseAreas } = require('./parsers/area.parser');
const fileSystem = require('fs');

parseAreas(Selectors.baseurl)
    .then((data) => {
        fileSystem.writeFileSync('result.json', JSON.stringify(data));
    });
