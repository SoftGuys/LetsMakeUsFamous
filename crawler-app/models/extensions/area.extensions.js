const { Area } = require('../area');
const { initDomParser } = require('../../parsers/dom-parser');
const { selectors } = require('../../selectors');

Area.fromHtml = (html) => {
    return initDomParser(html)
        .then(($) => {
            const areas = [];
            $(selectors.AREA_SELECTOR).each((_, elem) => {
                const $elem = $(elem);

                const name = $elem.text().trim();
                const route = $elem.attr('href')
                    .substring(selectors.BASE_RESOURCE.length);

                const area = new Area(name, route);
                areas.push(area);
            });

            return areas;
        });
};
