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

        it('expect to call response with status code 301 and redirect to domain page when user is logged', () => {
            req.isAuthenticated = () => {
                return true;
            }

            controller.getLoginView(req, res);
            expect(res.statusCode).to.equal(301);
            expect(res.redirectUrl).to.equal('/');
        });

        it('expect to render login form view with correct context object when no user is logged', () => {
            req.isAuthenticated = () => {
                return false;
            }

            req.user = {
                username: 'someUsername',
            };

            const expectedContext = {
                context: {
                    isAuthenticated: false,
                    user: { username: 'someUsername' }
                }
            };

            controller.getLoginView(req, res);
            expect(res.statusCode).to.equal(200);
            expect(res.viewName).to.equal('forms/login');
            expect(res.context).to.deep.equal(expectedContext);
        });
    });

    describe('getRegisterView tests', () => {
        beforeEach(() => {
            req.isAuthenticated = undefined;
            controller = userController();
        })

        it('expect to call response with status code 301 and redirect to domain page when user is logged', () => {
            req.isAuthenticated = () => {
                return true;
            }

            controller.getRegisterView(req, res);
            expect(res.statusCode).to.equal(301);
            expect(res.redirectUrl).to.equal('/');
        });


        it('expect to render forms/register view with correct context object when no user is logged in', () => {
            req.isAuthenticated = () => {
                return false;
            }

            req.user = {
                username: 'someUsername',
            };

            const expectedContext = {
                context: {
                    isAuthenticated: false,
                    user: { username: 'someUsername' }
                }
            };

            controller.getRegisterView(req, res);
            expect(res.statusCode).to.equal(200);
            expect(res.viewName).to.equal('forms/register');
            expect(res.context).to.deep.equal(expectedContext);
        });
    });

    describe('getPrfile view tests', () => {
        beforeEach(() => {
            req.isAuthenticated = undefined;
            controller = userController();
        })

        it('expect to call response with status code 301 and redirect to home page when no user is logged', () => {
            req.isAuthenticated = () => {
                return false;
            }

            controller.getProfileView(req, res);
            expect(res.statusCode).to.equal(301);
            expect(res.redirectUrl).to.equal('/home');
        });

        it('expect to render users/profile view with correct context object when user is logged in', () => {
            req.isAuthenticated = () => {
                return true;
            }

            req.user = {
                username: 'someUsername',
            };

            const expectedContext = {
                context: {
                    isAuthenticated: true,
                    user: { username: 'someUsername' }
                }
            };

            controller.getProfileView(req, res);
            expect(res.statusCode).to.equal(200);
            expect(res.viewName).to.equal('users/profile');
            expect(res.context).to.deep.equal(expectedContext);
        });
    });

    describe('uploadProfilePicture tests', () => {
        beforeEach(() => {
            let uploadPictureUser = null;
            let uploadPictureUrl = null;
            data = {
                users: {
                    updateProfilePicture(user, pictureUrl) {
                        return Promise.resolve();
                    }
                }
            };
            utils = {};
            controller = userController(data, utils);
        });

        afterEach(() => {
            req.isAuthenticated = undefined;
            uploadPictureUser = null;
            uploadPictureUrl = null;
        });

        it('expect to redirect to home page with status code 401 when user is not logged on', () => {
            req.isAuthenticated = () => {
                return false;
            };

            req.user = undefined;

            controller.uploadProfilePicture(req, res);
            expect(res.statusCode).to.equal(401);
            expect(res.redirectUrl).to.equal('/home');
        });

        it('expect to redirect to users/profile page when picture has been uploaded successfully', (done) => {
            req.isAuthenticated = () => {
                return true;
            };

            req.file = {
                filename: 'file.file'
            }

            req.toastr = {
                success(message) {},
            };
            req.user = true;

            controller.uploadProfilePicture(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.equal('/users/profile');
                })
                .then(done, done);
        });

        it('expect to redirect to users/profile page with status code 400 when promise rejection occurs', (done) => {
            req.isAuthenticated = () => {
                return true;
            };

            req.file = {
                filename: 'file.file'
            }

            req.toastr = {
                success(message) {
                    throw new Error('throw error')
                },
                error(message) {

                }
            };

            req.user = true;

            controller.uploadProfilePicture(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.equal('/users/profile');
                    expect(res.statusCode).to.equal(400);
                })
                .then(done, done);
        });
    });

    describe('getUserDestinationsView tests', () => {
        const user = {
            username: 'Ivan',
        };

        beforeEach(() => {
            data = {
                users: {
                    findUserByUsername(username) {
                        return Promise.resolve(user)
                    }
                }
            }

            utils = {};
            controller = userController(data, utils);
        });

        afterEach(() => {
            req.isAuthenticated = undefined;
            uploadPictureUser = null;
            uploadPictureUrl = null;
        });

        it('expect to render users/info view with correct context object when such user exists', (done) => {
            req.params = {
                username: 'Ivan',
            }
            req.user = {};
            req.isAuthenticated = () => {
                return false;
            };
            const expectedContext = {
                context: {
                    current: user,
                    user: req.user,
                    isAuthenticated: false,
                }
            };

            controller.getUserDestinationsView(req, res)
                .then(() => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.viewName).to.equal('users/info');
                    expect(res.context).to.deep.equal(expectedContext);
                })
                .then(done, done);
        });

        it('expect to redirect to /users with status code 404 when no user with that username is found', (done) => {
            req.params = {
                username: 'Ivan',
            }
            req.user = {};
            req.isAuthenticated = () => {
                return false;
            };

            req.toastr = {
                error() {

                },
            };

            data = {
                users: {
                    findUserByUsername() {
                        return Promise.resolve();
                    }
                }
            }

            controller = userController(data, utils);

            controller.getUserDestinationsView(req, res)
                .then(() => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.redirectUrl).to.equal('/users');
                })
                .then(done, done);
        });
    });

    describe('getMessagesView tests', () => {
        beforeEach(() => {
            data = {};
            utils = {}
            controller = userController();
        });

        afterEach(() => {

        });

        it('expect to redirect to domain with status code 401 when user is not authencticated', () => {
            req.isAuthenticated = () => {
                return false;
            }

            controller.getMessagesView(req, res);
            expect(res.statusCode).to.equal(401);
            expect(res.redirectUrl).to.equal('/');
        });

        it('expect to render messages view with correct context object when user is authenticated', () => {
            req.isAuthenticated = () => {
                return true;
            }

            req.query = {
                user: 'someUser',
            };

            req.user = {
                username: 'someName',
            };

            const expectedContext = {
                context: {
                    user: req.user,
                    isAuthenticated: true,
                    friend: 'someUser',
                },
            };

            controller.getMessagesView(req, res);
            expect(res.statusCode).to.equal(200);
            expect(res.viewName).to.equal('messages');
            expect(res.context).to.deep.equal(expectedContext);
        });
    });
});
