require('./polyfills');
const initDomParser = require('./dom-parser');
const routes = [];

const baseurl = 'http://100nto.org/objects-po-oblasti/';
fetch(baseurl)
    .then((response) => {
        return response.text();
    })
    .then((html) => {
        return initDomParser(html)
    })
    .then(($) => {
        let bg = $('h2 > a').each((_, elem) => {
            const $elem = $(elem);
            const name = $elem.text().trim();
            const route = $elem.attr('href').substring('/objects-po-oblasti/'.length);
            const area = {
                name,
                route
            }
            routes.push(area);
        })

    }).then(() => {
    routes.forEach((x) => {
        const landmarkRoute = baseurl + x.route;
        fetch(landmarkRoute)
            .then((response) => {
                return response.text()
            })
            .then((html) => {
                return initDomParser(html)
            })
            .then(($)=>{
                let description = $('.itemList .catItemTitle a');
                console.log(description.text())

            })

    })
})


