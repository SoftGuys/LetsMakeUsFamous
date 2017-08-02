/* eslint-disable */

const config = require('../../../config');
const request = require('supertest');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

describe('Home Routes Tests', () => {
    const connectionString = config.DB_CLOULD_TEST_CONNECTION_STRING;

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
            .then(() => require('../../../data')(db))
            .then((data) => require('../../../app')(data))
            .then((_app) => {
                app = _app;
                done();
            });
    });

    describe('GET /', () => {
        it('Expect to return status 302', (done) => {
            request(app)
                .get('/')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        }).timeout(2500);
    });

    describe('GET /home', () => {
        it('Expect to return status 200', (done) => {
            request(app)
                .get('/home')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        }).timeout(2500);
    });

    describe('GET /about', () => {
        it('Expect to return status 200', (done) => {
            request(app)
                .get('/about')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        }).timeout(2500);
    });
});
