/* eslint-disable */

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { expect } = chai;

const { getRequestMock, getResponseMock } = require('../req.res.mock');

const userController = require('../../../../../app/controllers/server.controllers/user.controller');

describe('userController tests', () => {
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

    describe('getLoginView tests', () => {
        beforeEach(() => {
            data = {};
            utils = {};
            controller = userController();
        });

        afterEach(() => {
            req.isAuthenticated = undefined;
        });

        it('expect to call response with status code 301 and redirect to domain page', () => {
            req.isAuthenticated = () => {
                return true;
            }

            controller.getLoginView(req, res);
            expect(res.statusCode).to.equal(301);
            expect(res.redirectUrl).to.equal('/');
        });

        it('expect to render correct view ', () => {
            req.isAuthenticated = () => {
                return true;
            }

            controller.getLoginView(req, res);
            expect(res.statusCode).to.equal(301);
            expect(res.redirectUrl).to.equal('/');
        });

    });
});
