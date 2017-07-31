/* eslint-disable */

const chai = require('chai');
const mock = require('mock-require');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { expect } = chai;


describe('users data tests', () => {
    let User = null;
    let database = null;
    let UsersData = null;

    before(() => {
        User = class {
            static validateModel(model) {
                return model;
            }
        }

        mock('../../../models/user.model.js', User);
        UsersData = require('../../../data/users.data');
    });

    beforeEach(() => {
        database = {
            collection() {
                return true;
            }
        };
    });

    describe('findUserByUsername tests', () => {
        let findOneParameter = null;
        const findOneResult = 'resultFindOne';
        beforeEach(() => {
            database = {
                collection() {
                    return {
                        findOne(parameter) {
                            findOneParameter = parameter;
                            return findOneResult;
                        }
                    }
                }
            };
        });

        afterEach(() => {
            findOneParameter = null;
            database = {
                collection() {
                    return true;
                }
            }
        });

        it('expect to return promise reject when passed username is not a string', (done) => {
            const usersData = new UsersData(database);
            usersData.findUserByUsername()
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call collectionFindOne with correct object', () => {
            const usersdata = new UsersData(database);

            const expectedObject = {
                username: 'someUsername',
            };

            usersdata.findUserByUsername('someUsername');
            expect(findOneParameter).to.deep.equal(expectedObject);
        });
    });

    describe('add tests', () => {
        const user = {
            username: 'someUsername',
            pass: 'SomePass',
        };

        let usersData;
        let findUserByUsernameParameter = null;
        beforeEach(() => {
            usersData = new UsersData(database);

            usersData.findUserByUsername = (username) => {
                findUserByUsernameParameter = username;
                return Promise.resolve()
            }
        });

        afterEach(() => {
            findUserByUsernameParameter = null;
            UsersData.findUserByUsername = null;
        });

        it('expect to return promise reject when user with passed username does not exist', (done) => {
            usersData.findUserByUsername = (username) => {
                return Promise.resolve(null);
            };

            usersData.add(user)
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true
                })
                .then(done, done);
        });
    });
});
