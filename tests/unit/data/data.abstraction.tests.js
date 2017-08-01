/* eslint-disable */

const chai = require('chai');
const mock = require('mock-require');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { expect } = chai;

const Data = require('../../../data/abstractions/data.abstraction');

describe('data.abstraction tests', () => {
    let database = null;
    let ModelClass = null;
    let validator = null;

    const init = () => {
        return new Data(database, ModelClass, validator);
    };

    describe('constructor tests', () => {
        beforeEach(() => {
            database = {};
            ModelClass = class {};
            validator = {};
            database.collection = (collectionName) => {
                return collectionName;
            };

            validator.validateModel = {};
        });

        it('expect to throw when passed databse object is not defined', () => {
            database = undefined;
            expect(init).to.throw();
        });

        it('expect to throw when passed ModelClass is undefined', () => {
            ModelClass = undefined;
            expect(init).to.throw();
        });

        it('expect to throw when passed validtor ins undefined', () => {
            validator = undefined;
            expect(init).to.throw();
        });

        it('expect to throw when validator.validateModel is undefined!', () => {
            validator.validateModel = undefined;
            expect(init).to.throw();
        });

        it('expect not to throw when all passed objects are valid', () => {
            expect(init).not.to.throw();
        });

        it('expect to set correct collectionName', () => {
            const expectedName = 'modelclasss';
            const data = init();
            expect(data.collectionName).to.equal(expectedName);
        });

        it('expect to call database.collection with correct collectionName',
            () => {
                const expectedCollectionName = 'modelclasss';
                const data = init();
                expect(data.collection).to.equal(expectedCollectionName);
            });
    });

    describe('count() tests', () => {
        const collection = {
            count() {

            },
        };

        const count = 5;
        let collectionCountStub;
        beforeEach(() => {
            collectionCountStub = sinon.stub(collection, 'count')
                .callsFake(() => {
                    return count;
                });

            database.collection = () => {
                return collection;
            };
        });

        afterEach(() => {
            collectionCountStub = null;
            collection.count.restore();
            database.collection = null;
        });

        ModelClass = class {};
        validator = {
            validateModel(model) {
                return model;
            },
        };

        it('expect to call collection.count once', () => {
            const data = init();

            data.count();
            expect(collectionCountStub).to.have.been.callCount(1);
        });

        it('expect to return the value return from collection.count', () => {
            const data = init();

            const resultCount = data.count();
            expect(resultCount).to.equal(count);
        });
    });

    describe('filter tests', () => {
        const array = [1, 2, 3];

        const filteredCollection = {
            toArray() {
                return array;
            },
        };

        const collection = {
            find() {
                return filteredCollection;
            },
        };

        let collectionSpy;
        let filteredCollectionSpy;
        beforeEach(() => {
            collectionSpy = sinon.spy(collection, 'find');
            filteredCollectionSpy = sinon.spy(filteredCollection, 'toArray')

            sinon.spy('')
            database = {
                collection() {
                    return collection;
                }
            };

            validator = {
                validateModel() {
                    return true;
                }
            };

            ModelClass = class {};
        });

        afterEach(() => {
            collectionSpy.restore();
            filteredCollectionSpy.restore();
        });

        it('expect to return the collection returned from collection.find',
            () => {
                const filterObject = {
                    name: 'Georgi',
                    age: 22,
                };

                const data = init();
                const result = data.filter(filterObject);

                expect(result).to.deep.equal(array);
            });


        it('expect to call database.collection.find().toArray() once', () => {
            const filterObject = {
                name: 'Ivan',
                age: 33,
            }

            const data = init();
            let filteredResult = data.filter(filterObject);

            expect(filteredCollectionSpy).to.have.been.calledOnce;

            collection.find.restore();
        });

        it('expect to call database.collection with correct filter Object', () => {
            const filterObject = {
                name: 'Ivan',
                age: 33,
            };

            const data = init();
            let filteredResult = data.filter(filterObject);

            expect(collectionSpy.firstCall.args[0])
                .to.deep.equal(filterObject);
        });
    });

    describe('findById tests', () => {
        let collection;
        let collectionSpy;
        let ObjectIdSpy;
        beforeEach(() => {
            ModelClass = class {};
            validator = {
                validateModel(model) {
                    return model;
                }
            };

            const ObjectID = () => {
                return 'result';
            };

            const mongoDb = {
                ObjectID() {
                    return true;
                }
            };

            collection = {
                findOne() {

                }
            };

            database = {
                collection() {
                    return collection;
                }
            };

            collectionSpy = sinon.spy(collection, 'findOne');
        });

        afterEach(() => {
            mock.stop('mongodb');
            collectionSpy.restore();
        });

        it('expect to reject promise when passed id is not a string', (done) => {
            const data = init();

            data.findById()
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call data.collectionFindOne when passed id as valid string', () => {
            const data = init();
            data.findById('5975ebaf408c2731c8619a4f');

            expect(collectionSpy).to.have.been.calledOnce;
        });
    });

    describe('add tests', () => {

        let collectionSpy;
        let validatorSpy;
        const insertResult = 'inserted';
        beforeEach(() => {
            ModelClass = class {};
            validator = {
                validateModel(model) {
                    return Promise.resolve(model);
                }
            };

            collection = {
                insert() {
                    return insertResult
                }
            };

            database = {
                collection() {
                    return collection;
                }
            };

            collectionSpy = sinon.spy(collection, 'insert');
            validatorSpy = sinon.spy(validator, 'validateModel');
        });

        afterEach(() => {
            collectionSpy.restore();
            validatorSpy.restore();
        });

        it('expect to call validator.validateModel with correct model object', (done) => {
            const modelObject = {
                name: 'Ivan',
                age: 33
            };

            const data = init();
            data.add(modelObject)
                .then(() => {
                    expect(validatorSpy.firstCall.args[0]).to.deep.equal(modelObject);
                })
                .then(done, done);
        });

        it('expect to call data.collection.insert once', (done) => {
            const modelObject = {
                name: 'Ivan',
                age: 33,
            };

            const data = init();

            data.add(modelObject)
                .then((validateModel) => {
                    expect(collectionSpy).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it('expect to call data.collection.insert with correct validated Object', (done) => {
            const modelObject = {
                name: 'Ivan',
                age: 33,
            };

            const data = init();

            data.add(modelObject)
                .then(() => {
                    expect(collectionSpy.firstCall.args[0]).to.deep.equal(modelObject);
                })
                .then(done, done);
        });

        it('expect to return correct result after inserting model successfully', (done) => {
            const modelObject = {
                name: 'Ivan',
                age: 33,
            };

            const data = init();

            data.add(modelObject)
                .then((res) => {
                    expect(insertResult).to.equal(res);
                })
                .then(done, done);
        });
    });

    describe('update tests', () => {
        let collectionSpy;
        const updateResult = 'updateResult';
        beforeEach(() => {
            ModelClass = class {};
            validator = {
                validateModel(model) {
                    return true;
                }
            };

            collection = {
                update() {
                    return updateResult
                }
            };

            database = {
                collection() {
                    return collection;
                }
            };

            collectionSpy = sinon.spy(collection, 'update');
        });

        afterEach(() => {
            collectionSpy.restore();
        });

        it('expect to return rejected promise when passed model is undefined!', (done) => {
            const data = init();
            data.update()
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    (expect(true).to.be.true);
                })
                .then(done, done);
        });

        it('expect to call data.collection.update once', () => {
            const data = init();
            const modelObject = {
                name: 'Ivan',
                age: 21,
                _id: 1,
            };

            data.update(modelObject);
            expect(collectionSpy).to.have.been.calledOnce;
        });


        it('expect to call data.collection.update with correct update first parameter', () => {
            const data = init();
            const modelObject = {
                name: 'Ivan',
                age: 21,
                _id: 1,
            };

            const expectedArg = {
                _id: modelObject._id,
            };

            data.update(modelObject);
            expect(collectionSpy.firstCall.args[0]).to.deep.equal(expectedArg);
        });

        it('expect to call data.collection.update with correct update model as second parameter', () => {
            const data = init();
            const modelObject = {
                name: 'Ivan',
                age: 21,
                _id: 1,
            };

            data.update(modelObject);
            expect(collectionSpy.firstCall.args[1]).to.deep.equal(modelObject);
        });

        it('expect to return the collection.update result', () => {
            const data = init();
            const modelObject = {
                name: 'Ivan',
                age: 21,
                _id: 1,
            };

            const result = data.update(modelObject);
            expect(result).to.equal(updateResult);
        });
    });

    describe('getRange tests', () => {
        let skipParameter;
        let limitParameter;
        let toArrayIsCalled = false;
        let findIsCalled = true;
        let getRangeValue = 'getRangeResult';
        beforeEach(() => {
            ModelClass = class {};
            validator = {
                validateModel(model) {
                    return true;
                }
            };

            collection = {
                find() {
                    findIsCalled = true;
                    return {
                        skip(sParam) {
                            skipParameter = sParam;

                            return {
                                limit(lParam) {
                                    limitParameter = lParam;
                                    return {
                                        toArray() {
                                            toArrayIsCalled = true;
                                            return getRangeValue;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            database = {
                collection() {
                    return collection;
                }
            };
        });

        afterEach(() => {
            limitParameter = null;
            toArrayIsCalled = false;
            findIsCalled = true;
        });

        it('expect to throw wen passed start parameter is not a number', () => {
            const data = init();
            const rangeFunction = () => {
                data.getRange();
            };

            expect(rangeFunction).to.throw();
        });


        it('expect to throw wen passed size parameter is not a number', () => {
            const data = init();
            const rangeFunction = () => {
                data.getRange(2);
            };

            expect(rangeFunction).to.throw();
        });

        it('expect to call data.collection.find when passed parameters are valid', () => {
            const data = init();
            data.getRange(10, 10);

            expect(findIsCalled).to.be.true;
        });

        it('expect to call data.collection.skip with correct number', () => {
            const data = init();
            data.getRange(10, 10);

            const expectedSkiParameter = 90;
            expect(skipParameter).to.equal(expectedSkiParameter);
        });


        it('expect to call data.collection.limit with correct size', () => {
            const data = init();
            data.getRange(10, 10);

            const expectedSize = 10;
            expect(limitParameter).to.equal(expectedSize);
        });


        it('expect to call data.collection.toArray', () => {
            const data = init();
            data.getRange(10, 10);
            expect(toArrayIsCalled).to.be.true;
        });

        it('expect to resut correct result from collection methods', () => {
            const data = init();

            const result = data.getRange(10, 10);
            expect(result).to.equal(getRangeValue);
        });
    });

    describe('getAll tests', () => {
        beforeEach(() => {
            ModelClass = class {};
            validator = {
                validateModel() {
                    return true;
                }
            };

            database = {
                collection() {
                    return 'str';
                },
            };
        });

        it('expect to call data.filterMethod', () => {
            const data = init();
            let filterParameter
            data.filter = (param) => {
                filterParameter = param;
                return true;
            };

            data.getAll();
            expect(filterParameter).to.deep.equal({});
        });

        it('expect to call data.filterMethod', () => {
            const data = init();
            let isFilterCalled = false;
            data.filter = (_) => {
                isFilterCalled = true;
                return true;
            };

            data.getAll();
            expect(isFilterCalled).to.be.true;
        });
    });
});
