/* globals __dirname */
const path = require('path');
const MAX_DISTANCE_FROM_DESTINATION = 15;

const destinationsController = (data, utils) => {
    return {
        getDestinationsView(req, res) {
            const page = Number(req.query.page);
            const { title } = req.query;

            const isSearchQuery = title && title.trim() !== '';
            const destinationsCountPromise = isSearchQuery ?
                data.landmarks.getByTitleCount(title) :
                data.landmarks.count();

            return destinationsCountPromise
                .then((landamrksCount) => {
                    const pagination = utils
                        .getPagination(page, landamrksCount);

                    return pagination;
                })
                .then((pagination) => {
                    let getLandmarksPromise;

                    if (!isSearchQuery) {
                        getLandmarksPromise =
                            data.landmarks
                            .getRange(pagination.currentPage,
                                pagination.pageSize);
                    } else {
                        getLandmarksPromise =
                            data.landmarks.getByTitle(title)
                            .then((ls) => {
                                return ls
                                    .splice(
                                        (pagination.currentPage - 1) *
                                        pagination.pageSize,
                                        pagination.pageSize);
                            });
                    }

                    getLandmarksPromise
                        .then((resultLandmarks) => resultLandmarks);

                    return Promise.all([getLandmarksPromise, pagination]);
                })
                .then(([landmarks, pagination]) => {
                    if (req.user) {
                        utils.markVisitedLandmarks(
                            req.user.landmarks,
                            landmarks);
                    }

                    const context = {
                        landmarks,
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                        pageLink: 'destinations',
                        pagination,
                        isSearchQuery,
                        searchKey: 'title',
                        searchValue: title,
                    };

                    return res
                        .status(200)
                        .render('destinations/all', { context });
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

                    const distance = utils.getDistanceFromLatLong(
                        userLatitude,
                        userLongitude,
                        landmarkLatitude,
                        landmarkLongitude);

                    if (distance > MAX_DISTANCE_FROM_DESTINATION) {
                        utils.deleteFile(
                            path.join(
                                __dirname,
                                '../../../public/images/uploads/' +
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
                    return res
                        .status(404)
                        .redirect('/destinations/' + req.params.id);
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

                    const context = {
                        landmark,
                        timeFromNow: utils.getPassedTime,
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                    };

                    if (req.user) {
                        context.isAdmin = req.user.isAdmin;
                    }

                    return res
                        .status(200)
                        .render('destinations/details', {
                            context,
                        });
                })
                .catch(() => {
                    return res.status(304).redirect('/destinations');
                });
        },
    };
};

module.exports = destinationsController;
