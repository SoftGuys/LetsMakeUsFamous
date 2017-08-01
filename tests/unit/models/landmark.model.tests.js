/* eslint-disable */

const chai = require('chai');
const mock = require('mock-require');


const {expect} = chai;
let model = require('../../../models/landmark.model');

describe('landmark model tests', () => {
    beforeEach(() => {
        model.title = 'someTitle';
        model.description = 1234;
        model.longitude= null;
        model.latitude = null;
    });
    afterEach(() => {
        let model = require('../../../models/landmark.model');
    });

    it('should reject when landmark is undefined', (done)=>{
        model.validateModel('undefined')
            .then(() => {
            expect(true).to.be.false;
        }, () => {
            expect(true).to.be.true
        })
            .then(done, done);
    })
    it('should reject when landmark is not string', (done)=>{
        model.validateModel(1234)
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done);
    })
    it('should reject when landmark has no longitude and latitude',(done)=>{
        model.title = 'someTitle';
        model.description = 'someDescription';
        model.validateModel(model)
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done);
    })
    it('should reject when landmark comment is undefiner or not string',(done)=>{
            const comment = undefined;
            model.validateModel(comment)
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done);
    })
    it('should reject when landmark lenght is out of range',(done)=>{
        const comment = 'some';
        model.validateModel(comment)
            .then(() => {
                expect(true).to.be.false;
            }, () => {
                expect(true).to.be.true
            })
            .then(done, done);
    })
    // it('should pass when landmark lenght is in range',(done)=>{
    //     const comment = 'some nice';
    //     comment.title = 'some title';
    //     model.validateModel(comment)
    //         .then((comment) => {
    //             expect(true).to.be.true;
    //         })
    //         .then(done, done);
    //
    // })
});


