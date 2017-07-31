/* eslint no-unused-expressions: 0 */

const chai = require('chai');
const mock = require('mock-require');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const Data = require('../../../data/abstractions/data.abstraction');

const { expect } = chai;

describe('data.abstraction tests', () => {
    let database = null;
    let ModelClass = null;
    let validator = null;

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

        const init = () => {
            return new Data(database, ModelClass, validator);
        };

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
});
