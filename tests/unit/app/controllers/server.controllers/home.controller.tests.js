/* eslint-disable */

const { expect } = require('chai');

describe('home controler tests', () => {
    let controller = null;
    let getController = null;

    let req = null;
    let res = null;

    beforeEach(() => {
        controller = {};
        getController = require('../../../../../app/controllers/server.controllers/home.controller');

        req = require('../req.res.mock').getRequestMock();
        res = require('../req.res.mock').getResponseMock();
    });

    describe('redirectHome tests', () => {
        beforeEach(() => {
            controller = getController();
        });

        it('expect to call res with correct parameters', () => {
            controller.redirectHome(req, res);

            expect(res.statusCode).to.be.equal(302);
            expect(res.redirectUrl).to.be.equal('/home');
        });
    });

    describe('getHomeView tests', () => {
        beforeEach(() => {
            controller = getController();

            req = { isAuthenticated: () => true, user: 'pesho' };
        });

        it('expect to call res with correct parameters', () => {
            controller.getHomeView(req, res);

            expect(res.statusCode).to.be.equal(200);
            expect(res.viewName).to.be.equal('home');
            expect(res.context).to.be.deep.equal({ context: { isAuthenticated: true, user: 'pesho' } });

        });
    });

    describe('aboutUs tests', () => {
        beforeEach(() => {
            controller = getController();
        });

        it('expect to call res with correct parameters', () => {
            controller.aboutUs(req, res);

            expect(res.statusCode).to.be.equal(200);
            expect(res.viewName).to.be.equal('about');
        });
    });
});
