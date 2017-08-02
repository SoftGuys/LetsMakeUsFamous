/* eslint-disable */

const config = require('../../../config');
const request = require('supertest');
const { expect } = require('chai');
const { MongoClient, ObjectID } = require('mongodb');

describe('Destination Routes Tests', () => {
    const connectionString = config.DB_LOCAL_TEST_CONNECTION_STRING;
    const destination = { title: 'landmark', comments: [] };

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
                return db.collection('landmarks').insert(destination)
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
        db.collection('landmarks').drop()
            .then(() => done());
    });

    describe('GET /destinations', () => {
        it('Expect to return status 200 if is not search query', (done) => {
            request(app)
                .get('/destinations?page=1')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        }).timeout(2500);

        it('Expect to return status 200 if is search query', (done) => {
            request(app)
                .get('/destinations?page=1&title=landmark')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        }).timeout(2500);
    });

    describe('GET /destinations/:id', () => {
        it('Expect to return status 302 if there is no such destination', (done) => {
            request(app)
                .get('/destinations/123451234512345123451234')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('Expect to return status 200 if there is such destination', (done) => {
            request(app)
                .get('/destinations/' + destination._id)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('POST /destinations/:id', () => {
        it('Expect if not authenticated to return status 302', (done) => {
            request(app)
                .post('/destinations/12345')
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
