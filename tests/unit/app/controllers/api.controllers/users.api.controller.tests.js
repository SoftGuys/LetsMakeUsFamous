/* eslint-disable */

const { expect } = require('chai');

describe('users api controler tests', () => {
    let data = null;
    let controller = null;
    let getController = null;

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {};
        controller = {};
        getController = require('../../../../../app/controllers/api.controllers/users.api.controller');

        req = require('../req.res.mock').getRequestMock();
        res = require('../req.res.mock').getResponseMock();
    });

    describe('getUsers tests', () => {
        beforeEach(() => {
            data.users = {
                getAll: () => Promise.resolve('users'),
            };

            controller = getController(data);
        });

        it('expect to return resolved promise', (done) => {
            controller.getUsers(req, res)
                .then(() => {
                    expect(true).to.be.true;
                })
                .then(done, done);
        });
        it('expect to call res status with 200', (done) => {
            controller.getUsers(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                })
                .then(done, done);
        });
        it('expect to call res send with correct users', (done) => {
            controller.getUsers(req, res)
                .then(() => {
                    expect(res.body).to.be.equal('users');
                })
                .then(done, done);
        });
    });

    describe('editProfile tests', () => {
        let user = {};

        beforeEach(() => {
            data.users = {
                findById: (id) => id === 'true' ? Promise.resolve(user) : Promise.reject(user),
                updateUserInfo: (user) => user,
            };

            controller = getController(data);

            req.user = { _id: true };
            req.body = {};
        });

        it('expect to call res with correct parameters when user is not authenticated', () => {
            req.user = false;

            controller.editProfile(req, res);

            expect(res.statusCode).to.be.equal(401);
            expect(res.body).to.be.equal('You must be logged in in order to edit profile!');
        });
        it('expect to resolve with correct parameters when user is correct', (done) => {
            controller.editProfile(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body).to.be.equal('Profile eddited successfully!');
                })
                .then(done, done);

        });
        it('expect to reject with correct parameters when user is incorrect', (done) => {
            req.user = { _id: false };

            controller.editProfile(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).to.be.deep.equal(user);
                })
                .then(done, done);
        });
    });

    describe('promoteUserToAdmin tests', () => {
        let user = {};

        beforeEach(() => {
            data.users = {
                findById: (id) => id ? Promise.resolve(user) : Promise.resolve(null),
                promoteToAdmin: (user) => user,
            };

            controller = getController(data);

            req.user = { isAdmin: true };
            req.params = { id: true };
        });

        it('expect to call res with correct parameters when user is not authorized', () => {
            req.user = { isAdmin: false };
            controller.promoteUserToAdmin(req, res);

            expect(res.statusCode).to.be.equal(401);
            expect(res.body).to.be.equal('You must be an admin to promote others!');
        });
        it('expect to reject when user is not correct', (done) => {
            req.params = { id: false };
            controller.promoteUserToAdmin(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body).to.be.equal('User not found!');
                })
                .then(done, done);
        });
        it('expect to resolve when user is correct', (done) => {
            controller.promoteUserToAdmin(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(204);
                    expect(res.body).to.be.deep.equal(user);
                })
                .then(done, done);
        });
    });
});
