/* eslint no-unused-expressions: 0 */

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
    });
});
