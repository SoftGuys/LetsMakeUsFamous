/* eslint-disable */

const chai = require('chai');
const mock = require('mock-require');


const { expect } = chai;
let model = require('../../../models/landmark.model');

describe('landmark model tests', () => {
    describe('validateModel tests', () => {
        beforeEach(() => {
            model.title = 'someTitle';
            model.description = 1234;
            model.longitude = null;
            model.latitude = null;
        });
        afterEach(() => {
            let model = require('../../../models/landmark.model');
        });

        it('should reject when landmark is undefined', (done) => {
            model.validateModel('undefined')
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true
                })
                .then(done, done);
        })
        it('should reject when landmark is not string', (done) => {
            model.validateModel(1234)
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true
                })
                .then(done, done);
        })
        it('should reject when landmark has no longitude and latitude', (done) => {
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
        it('should reject when landmark comment is undefiner or not string', (done) => {
            const comment = undefined;
            model.validateModel(comment)
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true
                })
                .then(done, done);
        })
        it('should reject when landmark lenght is out of range', (done) => {
            const comment = 'some';
            model.validateModel(comment)
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true
                })
                .then(done, done);
        })

        it('should resolve with landmark when passsed landmark is valid', (done) => {
            const landmark = {
                title: 'title',
                description: 'someDescription',
                longitude: 1,
                latitude: 1,
            };

            model.validateModel(landmark)
                .then((res) => {
                    expect(res).to.deep.equal(landmark);
                })
                .then(done, done);
        });
    });

    describe('validateComment tests', () => {
        it('should reject when passed comment is length is invalid', (done) => {
            model.validateComment({ text: 'sss' })
                .then(() => {
                        expect(true).to.be.false;
                    },
                    () => {
                        expect(true).to.be.true;
                    })
                .then(done, done);
        });

        it('should reject when passed comment is undefined', (done) => {
            model.validateComment()
                .then(() => {
                        expect(true).to.be.false;
                    },
                    () => {
                        expect(true).to.be.true;
                    })
                .then(done, done);
        });


        it('should resolve with passed comment when comment is valid', (done) => {
            const comment = {
                text: 'valid comment!'
            };
            model.validateComment(comment)
                .then((commentRes) => {
                    expect(commentRes).to.deep.equal(comment);
                })
                .then(done, done);
        });
    });
});
