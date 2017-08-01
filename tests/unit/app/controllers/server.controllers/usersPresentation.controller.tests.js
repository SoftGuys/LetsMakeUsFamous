/* eslint-disable */

const { expect } = require('chai');

describe('users presentation controller tests', () => {
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
        getController = require('../../../../../app/controllers/server.controllers/usersPresentation.controller');

        req = require('../req.res.mock').getRequestMock();
        res = require('../req.res.mock').getResponseMock();
    });

    describe('getRankingView tests', () => {
        beforeEach(() => {
            data.users = {
                count: () => Promise.resolve(1),
                getSortedByVisitedPlaces: () => 'users',
            };

            const paginator = { currentPage: 1, pageSize: 1 };
            utils.getPagination = () => paginator;

            controller = getController(data, utils);

            req.query = { page: 1 };
            req.isAuthenticated = () => true;
            req.user = 'user';
        });

        it('expect res to be called with correct params', (done) => {
            controller.getRankingView(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.viewName).to.be.equal('users/ranking');
                    expect(res.context).to.be.deep.equal({
                        context: {
                            user: 'user',
                            isAuthenticated: true,
                            users: 'users',
                            pageLink: 'users/ranking',
                            pagination: { currentPage: 1, pageSize: 1 },
                        }
                    })
                })
                .then(done, done);
        })
    });

    describe('getUsersView tests', () => {
        beforeEach(() => {
            data.users = {
                count: () => Promise.resolve(1),
                getCountByUsername: () => Promise.resolve(1),
                getRange: () => Promise.resolve(['range']),
                getByUsername: () => Promise.resolve(['range'])
            };

            const paginator = { currentPage: 1, pageSize: 1 };
            utils.getPagination = () => paginator;

            controller = getController(data, utils);

            req.query = { page: 1, username: 'pesho' };
            req.isAuthenticated = () => true;
            req.user = 'user';
        });

        it('expect to call res with correct params when is not search query', (done) => {
            req.query = { page: 1, username: '' };

            controller.getUsersView(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.viewName).to.be.equal('users/all');
                    expect(res.context).to.be.deep.equal({
                        context: {
                            user: 'user',
                            isAuthenticated: true,
                            users: ['range'],
                            pageLink: 'users',
                            pagination: { currentPage: 1, pageSize: 1 },
                            isSearchQuery: '',
                            searchKey: 'username',
                            searchValue: '',
                        }
                    });
                })
                .then(done, done);
        });
        it('expect to call res with correct params when is search query', (done) => {
            controller.getUsersView(req, res)
                .then(() => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.viewName).to.be.equal('users/all');
                    expect(res.context).to.be.deep.equal({
                        context: {
                            user: 'user',
                            isAuthenticated: true,
                            users: ['range'],
                            pageLink: 'users',
                            pagination: { currentPage: 1, pageSize: 1 },
                            isSearchQuery: true,
                            searchKey: 'username',
                            searchValue: 'pesho',
                        }
                    });
                })
                .then(done, done);
        });
    });
});
