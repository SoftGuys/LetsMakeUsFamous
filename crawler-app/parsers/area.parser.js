/* globals __dirname */

const Area = require('../models/area');
const selectors = require('../selectors');
const parseLandmark = require('./landmark.parser');
const initDomParser = require('./dom-parser');
const nodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: selectors.GOOGLE_API_KEY,
    formatter: null,
};

const geocoder = nodeGeocoder(options);
const REQUEST_SPEED = 3000;

const parseAreas = (url) => {
    let areas = [];

    const getAreaLandmarks = (area) => {
        const landmarkRoute = selectors.BASE_URL + area.id;

        return fetch(landmarkRoute)
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                return initDomParser(html);
            })
            .then(($) => {
                const $elements = $(selectors.ITEMLIST);
                $elements.each((_, elem) => {
                    // eslint-disable-next-line
                    console.log('.');
                    const $elem = $(elem);
                    const hrefParts = $elem.attr('href').split('/');
                    const href = hrefParts[3];
                    if (href === 'item') {
                        return;
                    }

                    const landmarkUrl = 'http://100nto.org' + hrefParts.join('/');

                    parseLandmark(landmarkUrl)
                        .then((landmark) => {
                            geocoder.geocode(landmark.title)
                                .then((res) => {
                                    res.map((x) => {
                                        landmark.latitude = x.latitude;
                                        landmark.longitude = x.longitude;
                                    });
                                    area.landmarks.push(landmark);

                                    const fs = require('fs');
                                    const request = require('request');
                                    const path = require('path');

                                    const download = (uri, filename) => {
                                        //eslint-disable-next-line
                                        request.head(uri, (err, res, body) => {
                                            if (!uri.includes('undefined')) {
                                                //eslint-disable-next-line
                                                filename = filename.replace(/[\s\-\"\'\\\/:]/gi, '');
                                                //eslint-disable-next-line
                                                landmark.pictureUrl = `/static/images/areas/${filename}`;
                                                //eslint-disable-next-line
                                                filename = '../../public/images/areas/' +
                                                    filename;
                                                request(uri)
                                                    .pipe(
                                                        fs.createWriteStream(
                                                            path.join(
                                                                __dirname,
                                                                filename)));
                                            }
                                        });
                                    };

                                    download(
                                        landmark.pictureUrl,
                                        landmark.title + '.jpeg');
                                });
                        });
                });
            });
    };

    return fetch(url)
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            return Area.fromHtml(html);
        })
        .then((resAreas) => {
            areas = resAreas;
            const promises = resAreas.map((area, index) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() =>
                        //eslint-disable-next-line
                        resolve(getAreaLandmarks(area)), index * REQUEST_SPEED);
                });
            });

            return Promise.all(promises);
        })
        .then(() => {
            return areas;
        });
};

module.exports = parseAreas;
