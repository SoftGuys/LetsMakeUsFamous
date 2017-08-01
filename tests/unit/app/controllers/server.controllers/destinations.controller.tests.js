/* eslint-disable */

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { expect } = chai;

const { getRequestMock, getResponseMock } = require('../req.res.mock');

const destinationsController = require('../../../../../app/controllers/server.controllers/destinations.controller');

describe('destinations.controller tests', () => {
    let data = null;
    let utils = null;

    let controller = null;
    let getController = null;

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {};
        utils = {};

        controller = {};

        req = getRequestMock();
        res = getResponseMock();
    });

    describe('getDesitnationsView tests', () => {
        const landmark = {
            title: 'someTitle',
            comments: ['asdf', 'fads'],
        };

        beforeEach(() => {
            utils = {
                getPassedTime: () => {},
            };


            data = {
                landmarks: {
                    findById(targetLandmarkId) {
                        return Promise.resolve(landmark)
                    },
                }
            };


            controller = destinationsController(data, utils);
        });

        afterEach(() => {
            req.isAuthenticated = undefined;
        });

        it('expect to render destination/details with correct contxt object', (done) => {
            req.user = {};
            req.isAuthenticated = () => {
                return true;
            }

            req.params = {
                id: 1,
            };

            req.user.isAdmin = false;

            const expectedContext = {
                context: {
                    landmark,
                    timeFromNow: utils.getPassedTime,
                    isAuthenticated: true,
                    user: req.user,
                    isAdmin: req.user.isAdmin,
                }
            };

            controller.getDestinationDetailsView(req, res)
                .then(() => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.viewName).to.equal('destinations/details');
                    expect(res.context).to.deep.equal(expectedContext);
                })
                .then(done, done);
        });

        it('expect to redirect to /destinations when an error occurs', (done) => {
            req.user = {};
            req.isAuthenticated = () => {
                throw new Error('Invalid landmark!');
            }

            req.params = {
                id: 1,
            };

            req.toastr = {
                error() {

                },
            };

            req.user.isAdmin = false;

            controller.getDestinationDetailsView(req, res)
                .then(() => {
                    expect(res.statusCode).to.equal(304);
                    expect(res.redirectUrl).to.equal('/destinations');
                })
                .then(done, done);
        });
    });

    describe('verifyVisitedDestination tests', () => {
        it('expect to redirect to /destinatins with status 401 when user is not logged in!', () => {
            req.user = undefined;
            controller = destinationsController();

            controller.verifyVisitedDestinations(req, res);
            expect(res.statusCode).to.equal(401);
            expect(res.redirectUrl).to.equal('/destinations');
        });

        it('expect to redirect to /destinations with status code 404 when no such landmark is found', (done) => {
            req.params = {
                id: 1,
            };

            req.user = {

            };

            req.body = {
                logitude: 1,
                latitude: 1,
            };

            req.toastr = {
                error() {}
            };

            data = {
                landmarks: {
                    findById() {
                        return Promise.resolve(null);
                    },
                }
            };

            controller = destinationsController(data, utils);
            controller.verifyVisitedDestinations(req, res)
                .then(() => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.redirectUrl).to.equal('/destinations/1');
                })
                .then(done, done);
        });


        it('expect to redirect to /destinations when user is too far from the target destination', (done) => {
            req.params = {
                id: 1,
            };

            req.user = {

            };

            req.body = {
                logitude: 1,
                latitude: 1,
            };

            req.toastr = {
                error() {}
            };

            utils = {
                getDistanceFromLatLong() {
                    return 250;
                }
            }

            data = {
                landmarks: {
                    findById() {
                        return Promise.resolve({});
                    },
                }
            };

            controller = destinationsController(data, utils);
            controller.verifyVisitedDestinations(req, res)
                .then(() => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.redirectUrl).to.equal('/destinations/1');
                })
                .then(done, done);
        });



        it('expect to redirect to /users/user.username when user is has marked the target destination visited', (done) => {
            req.params = {
                id: 1,
            };

            req.user = {
                username: 'Ivan',
            };

            req.file = {
                filename: 'someFuleName'
            }

            req.body = {
                logitude: 1,
                latitude: 1,
            };

            req.toastr = {
                error() {},
                success() {},
            };

            utils = {
                getDistanceFromLatLong() {
                    return 5;
                }
            }

            const resultMessage = 'message';
            data = {
                landmarks: {
                    findById() {
                        return Promise.resolve({});
                    },
                },
                users: {
                    markVisitedLandmark() {
                        return Promise.resolve()
                    }
                }
            };

            controller = destinationsController(data, utils);
            controller.verifyVisitedDestinations(req, res)
                .then(() => {
                    expect(res.statusCode).to.equal(304);
                    expect(res.redirectUrl).to.equal('/users/' + req.user.username);
                })
                .then(done, done);
        });
    });
});
