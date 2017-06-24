require('./polyfills');
require('./models/extensions');

const { Selectors } = require('./selectors');
const { parseAreas } = require('./parsers/area.parser');

parseAreas(Selectors.baseurl)
    .then((areas) => {
      console.log(JSON.stringify(areas));
    });