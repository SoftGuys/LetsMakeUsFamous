require('./polyfills');
const { Area } = require('./models/area');

const initDomParser = require('./dom-parser');
const areas = [];

const baseurl = 'http://100nto.org/objects-po-oblasti/';
fetch(baseurl)
    .then((response) => {
        return response.text();
    })
    .then((html) => {
        return initDomParser(html);
    })
    .then(($) => {
        $('h2 > a').each((_, elem) => {
            const $elem = $(elem);
            const name = $elem.text().trim();
            const route = $elem.attr('href').substring('/objects-po-oblasti/'.length);
            const area = new Area(name, route);
            areas.push(area);
        });
    })
    .then(() => {
        const promises = areas.map((area, index) => {
            const landmarkRoute = baseurl + area.id;

            return fetch(landmarkRoute)
                .then((response) => {
                    return response.text();
                })
                .then((html) => {
                    return initDomParser(html);
                })
                .then(($) => {
                    const $elements = $('.itemList .catItemTitle a');
                        $elements.each((_, elem) => {
                            const $elem = $(elem);
                            const href = $elem.attr('href').split('/')[3];
                            areas[index].landmarksIds.push(href);                           
                        });
                });

        });

        return Promise.all(promises);
    })
    .then(() => {
        console.log(areas);
    });