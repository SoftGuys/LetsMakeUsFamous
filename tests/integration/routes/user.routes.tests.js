/* eslint-disable */

const config = require('../../../config');
const request = require('supertest');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

describe('User Routes Tests', () => {
    const connectionString = config.DB_CLOUD_TEST_CONNECTION_STRING
    const user = { username: 'nepesho', password: '123456', landmarks: [] };

    let app = null;
    let db = null;

    before((done) => {
        MongoClient.connect(connectionString)
            .then((_db) => {
                db = _db;
                done();
            });
    });

    after((done) => {
        db.dropDatabase()
            .then(() => done());
    });

    beforeEach((done) => {
        Promise.resolve()
            .then(() => {
                return db.collection('users').insert(user)
                    .then(() => db);
            })
            .then((db) => require('../../../data')(db))
            .then((data) => require('../../../app')(data))
            .then((_app) => {
                app = _app;
                done();
            });
    });

    afterEach((done) => {
        db.collection('users').drop()
            .then(() => done());
    });

    describe('GET /users', () => {
        it('Expect to return status 200', (done) => {
            request(app)
                .get('/users?page=1')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        }).timeout(3000);
    });

    describe('GET /users/ranking', () => {
        it('Expect to return status 200 if is not search query', (done) => {
            request(app)
                .get('/users/ranking?page=1')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        }).timeout(3000);

        it('Expect to return status 200 if is search query', (done) => {
            request(app)
                .get('/users/ranking?page=1&username=nepesho')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        }).timeout(3000);
    });

    describe('GET /users/register', () => {
        it('Expect to return status 200 if not authenticated', (done) => {
            request(app)
                .get('/users/register')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /users/login', () => {
        it('Expect to return status 200 if not authenticated', (done) => {
            request(app)
                .get('/users/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /users/messages', () => {
        it('Expect to return status 302 if not authenticated', (done) => {
            request(app)
                .get('/users/messages')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /users/profile', () => {
        it('Expect to return status 302 if not authenticated', (done) => {
            request(app)
                .get('/users/profile')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('POST /users/profile', () => {
        it('Expect to return status 302 if not authenticated', (done) => {
            request(app)
                .post('/users/profile')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /users/:username', () => {
        it('Expect to return status 200 if user is valid', (done) => {
            request(app)
                .get('/users/' + user.username)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('Expect to return status 302 if user is not valid', (done) => {
            request(app)
                .get('/users/invalidUsername')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
