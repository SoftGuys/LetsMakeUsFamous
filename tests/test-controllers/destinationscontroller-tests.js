/* globals describe it beforeEach afterEach*/
'use strict';
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const data = {};
const req = {
    body: {
        content: 'Some comment',
        commentId: '2',
        name: 'sv. Aleksandar Nevski',
        description: 'Nai-golqmata curkva na Balkanite',
        imagePath: 'put',
    },
    params: {
        id: '2',
        username: 'Vasil',
    },
    user: { username: 'Vasil',
            _id: '5',
    },
};
// eslint-disable-next-line
const controller = require('../../app/controllers/destinations.controller')(data);

// eslint-disable-next-line
describe('NationalTouristSites/app/controllers/destinations.controller.js tests', ()=>{
    const res = {};
    beforeEach(() => {
            res.redirect = sinon.stub();
            data.addCommentToDestination = sinon.stub();
            data.addCommentToDestination.returns(Promise.resolve());
            data.createDestination = sinon.stub();
            data.createDestination.returns(Promise.resolve());
        });

        afterEach(() => {
            res.redirect = null;
            data.addCommentToDestination = null;
            data.createDestination = null;
        });

    it('Expect addComment to exist and be a function.', () => {

        });
    it('Expect addDestination to exist and be a function', ()=>{

        });
    // eslint-disable-next-line
    it('Expect addComment to call data.addCommentToDestination with correct params once.', () => {

        });
    // eslint-disable-next-line
    it('Expect addDestination to call data.createDestination with correct params once.', () => {

        });
});
