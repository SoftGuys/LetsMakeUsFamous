/* eslint-disable */

const chai = require('chai');
const mock = require('mock-require');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { expect } = chai;

describe('landmarks data tests', () => {
    let database = null;
    let Landmark = null;

    let LandmarksData;
    before(() => {
        Landmark = class {
            static validateModel(model) {
                return model;
            }
        }

        mock('../../../models/landmark.model.js', Landmark);
        LandmarksData = require('../../../data/landmarks.data');
    });

    after(() => {
        mock.stopAll();
    });

    let landmarksData = null;
    beforeEach(() => {
        validator = {
            validateModel(model) {
                return model;
            }
        };

        database = {
            collection() {
                return [];
            }
        };
        Landmark = class {};
    });

    afterEach(() => {
        validator = null;
        Landmark = null;
        database = null;
    });

    describe('getByTitle tests', () => {
        let isFindCalled = false;
        let isToArrayCalled = false;
        let returnedLandmarks = [{
                title: 'someTitle',
            },
            {
                title: 'otherTitle',
            }
        ];
        beforeEach(() => {
            database = {
                collection() {
                    return {
                        find() {
                            isFindCalled = true;
                            return {
                                toArray() {
                                    isToArrayCalled = true;
                                    return Promise.resolve(returnedLandmarks);
                                }
                            }
                        }
                    }
                }
            };
        });

        afterEach(() => {
            database = {
                collection() {

                }
            }

            isToArrayCalled = false;
            isFindCalled = false;
        });

        it('expect to reject promie when passed title is not a string', (done) => {
            landmarksData = new LandmarksData(database);

            landmarksData.getByTitle()
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call data.collection.find when passed title is valid string', (done) => {
            const landmarksData = new LandmarksData(database);

            landmarksData.getByTitle('someTitle')
                .then(() => {
                    expect(isFindCalled).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call data.collection.find.toArray when passed title is valid string', (done) => {
            const landmarksData = new LandmarksData(database);

            landmarksData.getByTitle('someTitle')
                .then(() => {
                    expect(isToArrayCalled).to.be.true;
                })
                .then(done, done);
        });

        it('expect return the correct filtered landmarks when the are title matches', (done) => {
            const landmarksData = new LandmarksData(database);

            landmarksData.getByTitle('title')
                .then((resultLandmakrs) => {
                    expect(resultLandmakrs.length).to.equal(2);
                })
                .then(done, done);
        });

        it('expect return the empty array when no title matches the provided one', (done) => {
            const landmarksData = new LandmarksData(database);

            landmarksData.getByTitle('nematchingtitle')
                .then((resultLandmakrs) => {
                    expect(resultLandmakrs.length).to.equal(0);
                })
                .then(done, done);
        });
    });

    describe('getByTitleCount tests', () => {
        let landmarksArray = [1, 2, 3, 4, 5];
        beforeEach(() => {
            landmarksData = new LandmarksData(database);
            landmarksData.getByTitle = () => {
                return Promise.resolve(landmarksArray)
            };
        });

        afterEach(() => {
            landmarksData = null;
        });

        it('expect to return the correct landmarks count', (done) => {
            landmarksData.getByTitleCount()
                .then((resultLength) => {
                    expect(resultLength).to.equal(5);
                })
                .then(done, done);
        });
    });

    describe('addComment tests', () => {
        let validateCommentParameter = null;
        let validateModelParameter = null;
        let updateParameter = null;
        beforeEach(() => {
            landmarksData = new LandmarksData(database);

            landmarksData.validator.validateComment = (comment) => {
                validateCommentParameter = comment;
                return Promise.resolve(comment);
            };

            landmarksData.validator.validateModel = (model) => {
                validateModelParameter = model;
                return Promise.resolve(model);
            }

            landmarksData.update = (validatedLandmark) => {
                updateParameter = validatedLandmark;
                return Promise.resolve(validatedLandmark);
            }
        });

        afterEach(() => {
            Landmark.validateComment = null;
            Landmark.validateModel = (model) => {
                return model;
            }

            validateCommentParameter = null;
            validateModelParameter = null;
            updateParameter = null;

            landmarksData = null;
        });

        it('expect to call validators validateComment method with the passed comment object', (done) => {
            const landmark = {
                title: 'someTitle'
            };
            const comment = {
                text: 'SomeText',
            };

            landmarksData.addComment(landmark, comment)
                .then((comment) => {
                    expect(validateCommentParameter).to.deep.equal(comment);
                })
                .then(done, done);
        });

        it('expect to call validators method with the passed landmark object', (done) => {
            const landmark = {
                title: 'someTitle'
            };
            const comment = {
                text: 'SomeText',
            };

            landmarksData.addComment(landmark, comment)
                .then((comment) => {
                    expect(validateModelParameter).to.deep.equal(landmark);
                })
                .then(done, done);
        });

        it('call data.update with valid landmark object', (done) => {
            const landmark = {
                title: 'someTitle'
            };

            const comment = {
                text: 'SomeText',
            };

            const expectedUpdateObject = {
                title: 'someTitle',
                comments: [comment],
            };

            landmarksData.addComment(landmark, comment)
                .then((comment) => {
                    expect(updateParameter).to.deep.equal(expectedUpdateObject);
                })
                .then(done, done);
        });
    });
});
