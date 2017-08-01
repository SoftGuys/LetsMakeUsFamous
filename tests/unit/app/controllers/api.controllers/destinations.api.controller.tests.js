/* eslint-disable */
const { expect } = chai;

describe('destinations api controler tests', () => {
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
        getController = require('../../../../../app/controllers/api.controllers/destinations.api.controller');

        req = require('../req.res.mock').getRequestMock();
        res = require('../req.res.mock').getResponseMock();
    });

    describe('getDestinations tests', () => {
        beforeEach(() => {
            data.landmarks = {
                getAll: () => Promise.resolve('landmarks'),
            };

            controller = getController(data, utils);
        });

        it('expect to return resolved promise', (done) => {
            controller.getDestinations(req, res)
                .then(() => {
                    expect(true).to.be.true;
                })
                .then(done, done);
        });
        it('expect to call res status with 200', (done) => {
            controller.getDestinations(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                })
                .then(done, done);
        });
        it('expect to call res send with correct landmarks', (done) => {
            controller.getDestinations(req, res)
                .then(() => {
                    expect(res.body).to.be.equal('landmarks');
                })
                .then(done, done);
        });
    });

    describe('editDestinationComment tests', () => {
        let landmark = null

        beforeEach(() => {
            landmark = { comments: [] };;

            data.landmarks = {
                findById: () => Promise.resolve(landmark),
                update: (landmark) => Promise.resolve(landmark),
            };

            controller = getController(data, utils);

            req.body = { oldText: 'old text', newText: 'new text' };
            req.params = { id: 42 };
        });

        it('expect to reject promise when there is no such comment', (done) => {
            controller.editDestinationComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).to.be.equal('Such comment does not exist');
                })
                .then(done, done);
        });
        it('expect to resolve promise when there is such comment', (done) => {
            landmark.comments.push({ text: 'old text', user: { username: 'pesho' } });

            controller.editDestinationComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body).to.be.deep.equal(landmark);
                })
                .then(done, done);
        });
    });

    describe('addDestinationComment tests', () => {
        let landmark = null;

        beforeEach(() => {
            landmark = {};

            data.landmarks = {
                findById: (id) => Promise.resolve(landmark),
                addComment: (landmark, comment) => comment,
            };

            controller = getController(data, utils);

            req.body = {};
            req.params = { id: 24 };
            req.user = {
                username: 'pesho',
                _id: 42,
                pictureUrl: 'url',
            };
        });

        it('expect to call res with correct params when user is not logged in', () => {
            req.user = false;

            controller.addDestinationComment(req, res);

            expect(res.statusCode).to.be.equal(401);
            expect(res.body).to.be.equal('You must be logged in in order to comment!');
        });
        it('expect to call res with correct params when landmark is null', (done) => {
            controller = getController({ landmarks: { findById: () => Promise.resolve(null) } }, utils)

            controller.addDestinationComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).to.be.equal('Landmark not found!');
                })
                .then(done, done);
        });
        it('expect to call res with correct params when landmark is correct', (done) => {
            controller.addDestinationComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(201);

                    Object.keys(req.user).forEach(x => {
                        expect(req.user[x]).to.be.equal(res.body.user[x]);
                    });
                })
                .then(done, done);
        });
    });

    describe('deleteDestinationComment tests', () => {
        let landmark = null;
        let comments = [];

        beforeEach(() => {
            comments = [];
            landmark = { comments };

            data.landmarks = {
                findById: (id) => id ? Promise.resolve(landmark) : Promise.resolve(null),
                update: (landmark) => landmark,
            };

            controller = getController(data, utils);

            req.body = { text: 'text' };
            req.params = { id: true };
            req.user = {
                isAdmin: false,
                username: 'pesho',
            };
        });

        it('expect to reject when landmark is null', (done) => {
            req.params = { id: false };

            controller.deleteDestinationComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).to.be.equal('Landmark does not exist!');
                })
                .then(done, done);
        });
        it('expect to reject when comment is not there', (done) => {
            controller.deleteDestinationComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).to.be.equal('No such comment!');
                })
                .then(done, done);
        });
        it('expect to reject when user is not author or admin', (done) => {
            landmark = { comments: [{ user: { username: 'pesho0' }, text: 'text' }] };

            controller.deleteDestinationComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).to.be.equal('You must be an admin in order to delete!');
                })
                .then(done, done);
        });
        it('expect to resolve when user is authorized', (done) => {
            landmark = { comments: [{ user: { username: 'pesho' }, text: 'text' }] };
            req.user.isAdmin = true;

            controller.deleteDestinationComment(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body).to.be.equal(landmark);
                })
                .then(done, done);
        });
    });
});
