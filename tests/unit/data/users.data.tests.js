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
                return Promise.resolve({});
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

    describe('updateUserInfo tests', () => {
        let usersData;
        let validateUserInfoParameter = null;
        let updateParameter = null;
        beforeEach(() => {
            usersData = new UsersData(database);

            usersData.validator.validateUserInfo = (user) => {
                validateUserInfoParameter = user;
                return Promise.resolve(user);
            };

            usersData.update = (model) => {
                updateParameter = model;
                return model;
            };
        });

        afterEach(() => {
            validateUserInfoParameter = null;
            updateParameter = null;
        });

        it('expect to call validator.validateUserInfo', (done) => {
            const user = {
                username: 'Pencho',
                pass: '1234',
            };

            usersData.updateUserInfo(user)
                .then(() => {
                    expect(validateUserInfoParameter).to.deep.equal(user);
                })
                .then(done, done);
        });

        it('expect to call data.update with the passed user', (done) => {
            const user = {
                username: 'Pencho',
                pass: '1234',
            };

            usersData.updateUserInfo(user)
                .then(() => {
                    expect(updateParameter).to.deep.equal(user);
                })
                .then(done, done);
        });
    });

    describe('promoteAdmin tests', () => {
        let updateParameter = null;
        let usersData;

        beforeEach(() => {
            usersData = new UsersData(database);
            usersData.update = (user) => {
                updateParameter = user;
                return Promise.resolve(user);
            };
        });

        afterEach(() => {
            updateParameter = null;
        });

        it('expect to return promise reject when passed user in undefined', (done) => {
            usersData.promoteToAdmin()
                .then(() => {
                    expect(true).to.be.false
                }, () => {
                    expect(true).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call data.update with valid user object, that is no an admin', (done) => {
            const user = {
                username: 'someUsername',
            };

            const expectedObject = {
                username: 'someUsername',
                isAdmin: true,
            };

            usersData.promoteToAdmin(user)
                .then(() => {
                    expect(updateParameter).to.deep.equal(expectedObject);
                })
                .then(done, done);
        });

        it('expect return correct user object when user is succesfully promoted', (done) => {
            const user = {
                username: 'someUsername',
            };

            usersData.promoteToAdmin(user)
                .then((resUser) => {
                    expect(resUser).to.deep.equal(user);
                })
                .then(done, done);
        });
    });

    describe('getCountByUsername tests', () => {
        const usersArray = [1, 2, 3, 4, 5];

        let getByUsernameParameter = null;
        let usersData;
        beforeEach(() => {
            usersData = new UsersData(database);

            usersData.getByUsername = (username) => {
                getByUsernameParameter = username;
                return Promise.resolve(usersArray);
            };
        });

        afterEach(() => {
            getByUsernameParameter = null;
        });

        it('expect to call data.getByUsername with the same passed username', (done) => {
            const username = 'someUsername';
            usersData.getCountByUsername(username)
                .then(() => {
                    expect(getByUsernameParameter).to.equal(username);
                })
                .then(done, done);
        });

        it('expect to return the correct count of users', (done) => {
            const username = 'someUsername';
            usersData.getCountByUsername(username)
                .then((usersCount) => {
                    expect(usersCount).to.equal(5);
                })
                .then(done, done);
        });
    });

    describe('getByUsername tests', () => {
        let findParameter = null;
        let isToArrayCalled = false;
        let usersData;
        const returnValue = 'returnValue';
        beforeEach(() => {
            database = {
                collection() {
                    return {
                        find(parameter) {
                            findParameter = parameter;
                            return {
                                toArray() {
                                    isToArrayCalled = true;
                                    return returnValue;
                                }
                            }
                        }
                    }
                }
            };

            usersData = new UsersData(database);
        });

        afterEach(() => {
            findParameter = null;
            isToArrayCalled = false;
            database = {
                collection() {
                    return true;
                }
            }
        });

        it('expect to return promise rejct when passed username is not a valid string', (done) => {
            usersData.getByUsername(1)
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true;
                })
                .then(done, done);

        });

        it('expect to call data.collection.find with correct filter object', () => {
            const username = 'someUsername';

            const expectedObject = {
                username: {
                    $regex: new RegExp(`.*${username}.*`, 'ig'),
                }
            };

            usersData.getByUsername(username)
            expect(findParameter).to.deep.equal(expectedObject);
        });

        it('expect to call collection.find.toArray', () => {
            const username = 'someUsername';

            const expectedObject = {
                username: {
                    $regex: new RegExp(`.*${username}.*`, 'ig'),
                }
            };

            usersData.getByUsername(username)
            expect(isToArrayCalled).to.be.true;
        });
    });

    describe('getSortedByVisitedPlaces tests', () => {
        let isFindCalled = false;
        let sortParameter = null;
        let skipParameter = null;
        let limitParameter = null;
        let isToArrayCalled = null;

        let usersData;

        const resultValue = 'result';
        beforeEach(() => {
            database = {
                collection() {
                    return {
                        find() {
                            isFindCalled = true;
                            return {
                                sort(sortParam) {
                                    sortParameter = sortParam;
                                    return {
                                        skip(skipParam) {
                                            skipParameter = skipParam;
                                            return {
                                                limit(limitParam) {
                                                    limitParameter = limitParam;
                                                    return {
                                                        toArray() {
                                                            isToArrayCalled = true;
                                                            return resultValue;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            usersData = new UsersData(database);
        });

        afterEach(() => {
            isFindCalled = false;
            sortParameter = null;
            skipParameter = null;
            limitParameter = null;
            isToArrayCalled = null;

            database = {
                collection() {
                    return true;
                }
            };
        });

        it('expect to throw when passed start parameter is not a number', () => {
            const f = () => {
                usersdata.getSortedByVisitedPlaces();
            };

            expect(f).to.throw();
        });


        it('expect to throw when passed size parameter is not a number', () => {
            const f = () => {
                usersdata.getSortedByVisitedPlaces(22);
            };

            expect(f).to.throw();
        });

        it('expect call data.collection.find when passed parameters are vali numbers', () => {
            usersData.getSortedByVisitedPlaces(10, 10);
            expect(isFindCalled).to.be.true;
        });

        it('expect call data.collection.sort with correct sort object when passed parameters are vali numbers', () => {
            const expectedObject = {
                visitedPlaces: -1,
            };

            usersData.getSortedByVisitedPlaces(10, 10);
            expect(sortParameter).to.deep.equal(expectedObject);
        });

        it('expect call data.collection.skip with correct skip parameter when passed parameters are vali numbers', () => {
            usersData.getSortedByVisitedPlaces(10, 10);
            expect(skipParameter).to.equal(90);
        });

        it('expect call data.collection.limit with correct size when passed parameters are vali numbers', () => {
            usersData.getSortedByVisitedPlaces(10, 10);
            expect(limitParameter).to.equal(10);
        });

        it('expect call data.collection.toArray() when passed parameters are vali numbers', () => {
            usersData.getSortedByVisitedPlaces(10, 10);
            expect(isToArrayCalled).to.be.true;
        });

        describe('validateUserPassword tests', () => {
            let usersData;
            let userParameter = null;
            let passwordParameter = null;
            beforeEach(() => {
                usersData = new UsersData(database);

                usersData.validatePassword = (user, password) => {
                    userParameter = user;
                    passwordParameter = password;

                    return true;
                };
            });

            afterEach(() => {
                userParameter = null;
                passwordParametr = null;
            });

            it('expect to call validator.validatePassword with correct user object', () => {
                const user = {
                    username: 'someUsername',
                };

                const password = 123456;

                usersData.validatePassword(user, password);
                expect(userParameter).to.deep.equal(user);
            });

            it('expect to call validator.validatePassword with correct password parameter', () => {
                const user = {
                    username: 'someUsername',
                };

                const password = 123456;

                usersData.validatePassword(user, password);
                expect(passwordParameter).to.deep.equal(password);
            });
        });
    });

    describe('updateProfilePicture tests', () => {
        let usersData;
        let updateParameter = null;
        beforeEach(() => {
            usersData = new UsersData(database);
            usersData.update = (user) => {
                updateParameter = user;
            };
        });

        afterEach(() => {
            updateParameter = null;
        });

        it('expect to return promise reject when passed pictureUrl is not a string', (done) => {
            usersData.updateProfilePicture()
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call data.update when passed pictureUrl is valid string', () => {
            const user = {
                username: 'Ivan',
            };

            const pictureUrl = 'url';

            const expectedObject = {
                username: 'Ivan',
                pictureUrl: 'url',
            }

            usersData.updateProfilePicture(user, pictureUrl);
            expect(expectedObject).to.deep.equal(updateParameter);
        });
    });

    describe('getRankName tests', () => {
        let usersData;
        let validateRankParam = null;
        beforeEach(() => {
            usersData = new UsersData(database);

            usersData.validator.validateRank = (rankIndex) => {
                validateRankParam = rankIndex;
                return Promise.resolve(rankIndex);
            };
        });

        afterEach(() => {
            userParameter = null;
            passwordParametr = null;
        });

        it('expect to call validator.validateRank with correct rankIndex', (done) => {
            usersData.getRankName(0)
                .then(() => {
                    expect(validateRankParam).to.equal(0);
                })
                .then(done, done);
        });

        it('expect to return correct rank name when rank index is validated', (done) => {
            const expectedName = 'freakpazo';
            usersData.getRankName(0)
                .then((rankName) => {
                    expect(expectedName).to.equal(rankName);
                })
                .then(done, done);
        });
    });

    describe('addFriendship tests', () => {
        let usersData;
        let updateParameters = [];
        beforeEach(() => {
            usersData = new UsersData(database);

            usersData.ModelClass.getFriendModel = (friend) => {
                return friend.username;
            };

            usersData.update = (model) => {
                updateParameters.push(model);
                return model;
            };
        });

        afterEach(() => {
            updateParameter = null;
        });

        it('expect to call data.update with the correct passed user', () => {
            const user = {
                username: 'Gosho',
                friends: [],
            };

            const friend = {
                username: 'Tosho',
                friends: [],
                notifications: [],
            };

            const expected = {
                username: 'Gosho',
                friends: ['Tosho'],
            };

            usersData.addFriendship(user, friend);
            expect(updateParameters[0]).to.deep.equal(expected);
        });

        it('expect to call data.update with the friend object', () => {
            const user = {
                username: 'Gosho',
                friends: [],
            };

            const friend = {
                username: 'Tosho',
                friends: [],
                notifications: [],
            };

            const expected = {
                username: 'Tosho',
                friends: ['Gosho'],
                notifications: [`${user.username} added you as a friend!`],
            };

            usersData.addFriendship(user, friend);
            expect(updateParameters[1]).to.deep.equal(expected);
        });
    });

    describe('addChatMessage tests', () => {
        let usersData;
        let updateParameters = [];
        beforeEach(() => {
            usersData = new UsersData(database);
            usersData.update = (model) => {
                updateParameters.push(model);
                return model;
            };
        });

        afterEach(() => {
            updateParameters = [];
            database = {
                collection() {
                    return true;
                }
            };
        });

        it('expect to return promise reject when passed users are not friends', (done) => {
            const user = {
                friends: [],
            };
            const friend = {
                friends: [],
            };

            usersData.addChatMessage(user, friend, {})
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call data.update with the correct user object', (done) => {
            const user = {
                _id: 1,
                friends: [{ _id: 2, messages: [], }],
                messages: [],
                notifications: [],
            };
            const friend = {
                _id: 2,
                friends: [{ _id: 1, messages: [], }],
                notifications: [],
                messages: [],
            };

            usersData.addChatMessage(user, friend, {})
                .then(() => {
                    expect(updateParameters[0]).deep.equal(user);
                })
                .then(done, done);
        });

        it('expect to return promise with the correct messgae model', (done) => {
            const user = {
                _id: 1,
                friends: [{ _id: 2, messages: [], }],
                messages: [],
                notifications: [],
            };
            const friend = {
                _id: 2,
                friends: [{ _id: 1, messages: [], }],
                notifications: [],
                messages: [],
            };

            usersData.addChatMessage(user, friend, 'someMessage')
                .then((msgModel) => {
                    expect(msgModel.message).to.equal('someMessage');
                })
                .then(done, done);
        });
    });

    describe('markVisitedLandmark tests', () => {
        let usersData;
        let updateParameter;
        beforeEach(() => {
            usersData = new UsersData(database);
            usersData.update = (user) => {
                updateParameter = user;
                return Promise.resolve(user);
            }
        });

        afterEach(() => {
            updateParameter = null;
        });

        it('expect to return promise reject when passed user is undefined', (done) => {
            usersData.markVisitedLandmark()
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true;
                })
                .then(done, done);
        });


        it('expect to return promise reject when passed landmarkTitle is not a valid string', (done) => {
            usersData.markVisitedLandmark({})
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true;
                })
                .then(done, done);
        });


        it('expect to return promise reject when passed landmarkTitle is invalid', (done) => {
            const user = {
                landmarks: [],
            }

            usersData.markVisitedLandmark(user, 'dafasd', 'pic')
                .then(() => {
                    expect(true).to.be.false;
                }, () => {
                    expect(true).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call data.update with the correct updated user object', (done) => {
            const user = {
                landmarks: [{ title: 'name', isVisited: false }],
                visitedPlaces: 2,
            }

            const expected = {
                landmarks: [{ title: 'name', isVisited: true, pictureUrl: 'pic' }],
                visitedPlaces: 3,
                rank: 'freakpazo',
            };

            usersData.markVisitedLandmark(user, 'name', 'pic')
                .then(() => {
                    expect(updateParameter).to.deep.equal(expected)
                })
                .then(done, done);
        });
    });
});
