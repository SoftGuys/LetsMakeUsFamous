/* globals __dirname */
const path = require('path');

const DEFAULT_VISIBLE_PAGES = 5;
const DEFAULT_PAGE = 1;
const MAX_DISTANCE_FROM_DESTINATION = 15;

const destinationsController = (data, utils) => {
    return {
        getDestinationsView(req, res) {
            const page = req.query.page || DEFAULT_PAGE;
            const size = req.query.size;

            data.landmarks.getRange(page, size)
                .then((landmarks) => {
                    const pages = utils
                        .getPagination(Number(page), DEFAULT_VISIBLE_PAGES);

                    if (req.user) {
                        landmarks.forEach((l) => {
                            l.isVisited = req.user.landmarks.some((ul) => {
                                return ul.title === l.title && ul.isVisited;
                            });
                        });
                    }

                    return res
                        .status(200)
                        .render('destinations/all', {
                            context: {
                                landmarks,
                                pages,
                                currentPage: Number(page),
                                isAuthenticated: req.isAuthenticated(),
                                user: req.user,
                                pageLink: 'destinations',
                            },
                        });
                });
        },
        getDestinationDetailsView(req, res) {
            const targetLandmarkId = req.params.id;

            if (typeof targetLandmarkId === 'undefined') {
                return res.status(304).redirect('/destinations');
            }

            return data.landmarks.findById(targetLandmarkId)
                .then((landmark) => {
                    if (landmark.comments && landmark.comments.length) {
                        landmark.comments.reverse();
                    }
                    return res
                        .status(200)
                        .render('destinations/details', {
                            context: {
                                landmark,
                                isAuthenticated: req.isAuthenticated(),
                                user: req.user,
                            },
                        });
                });
        },
        verifyVisitedDestinations(req, res) {
            if (!req.user) {
                return res.status(401)
                    .redirect('/destinations');
            }

            const landmarkId = req.params.id;
            const userLongitude = Number(req.body.longitude);
            const userLatitude = Number(req.body.latitude);

            return data.landmarks.findById(landmarkId)
                .then((landmark) => {
                    if (landmark === null) {
                        return Promise.reject('Invalid landmark id');
                    }

                    const landmarkLongitude = Number(landmark.longitude);
                    const landmarkLatitude = Number(landmark.latitude);
                    console.log(userLongitude);
                    console.log(userLongitude);
                    const distance = utils.getDistanceFromLatLong(
                        userLatitude,
                        userLongitude,
                        landmarkLatitude,
                        landmarkLongitude);

                    if (distance > MAX_DISTANCE_FROM_DESTINATION) {
                        console.log(utils.deleteFile);
                        utils.deleteFile(
                            path.join(
                                __dirname,
                                '../../public/images/uploads/' +
                                req.file.filename));
                        return Promise.reject(
                            'Destination is too far ' +
                            'from you current location!');
                    }

                    const pictureUrl = '/static/images/uploads/' +
                        req.file.filename;
                    return data.users
                        .markVisitedLandmark(
                            req.user,
                            landmark.title,
                            pictureUrl);
                })
                .then((message) => {
                    req.toastr.success(message);
                    return res
                        .status(304)
                        .redirect('/users/' + req.user.username);
                })
                .catch((message) => {
                    req.toastr.error(message);
                    res
                        .status(404)
                        .redirect('/destinations/' + req.params.id);
                });
        },
        showMap(req, res) {
            const id = req.params.id;
            data.landmarks.findById(id)
                .then((details) => {
                    const cords = {
                        lon: details.longitude,
                        lat: details.latitude,
                        name: details.title,
                    };
                    return res
                        .status(200)
                        .render('destinations/googlemap', {
                            context: {
                                cords: cords,
                            },
                        });
                });
        },
    };
};

module.exports = destinationsController;
