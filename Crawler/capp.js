require('./polyfills');
const initDomParser = require('./dom-parser');
const areas = [];

const baseurl = 'http://100nto.org/objects-po-oblasti/';
fetch(baseurl)
    .then((response) => {
        return response.text();
    })
    .then((html) => {
        return initDomParser(html)
    })
    .then(($) => {
        $('h2 > a').each((_, elem) => {
            const $elem = $(elem);
            const name = $elem.text().trim();
            const route = $elem.attr('href').substring('/objects-po-oblasti/'.length);
            const area = {
                name,
                route,
                landmarksIds: []
            }
            areas.push(area);
        })
    })
    .then(() => {
        // areas.forEach((x) => {
        //     console.log(x)
            // const landmarkRoute = baseurl + x.route;
            // fetch(landmarkRoute)
            //     .then((response) => {
            //         return response.text()
            //     })
            //     .then((html) => {
            //         return initDomParser(html)
            //     })
            //     .then(($) => {
            //         $('.itemList .catItemTitle a')
            //             .each((_, elem) => {
            //                 const $elem = $(elem);
            //                 const href = $elem.attr('href').split('/')[3];
            //                 x.landmarksIds.push(href);
            //             });
            //     })
            //     .then(() => {
            //         console.log(areas);
            //     });
        // })
    })


