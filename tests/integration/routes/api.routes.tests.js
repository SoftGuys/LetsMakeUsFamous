/* eslint-disable */

const request = require('supertest');
const { expect } = require('chai');
const { MongoClient, ObjectID } = require('mongodb');

const crypto = require('crypto-js');

describe('API Routes Tests', () => {
    const connectionString = 'mongodb://localhost/tourist-sites-test';
    const user = { username: 'nepesho', password: '123456' };
    const destination = { title: 'pakpesho', comments: [] };

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
        db.collection('users').drop()
            .then(() => db.collection('landmarks').drop())
            .then(() => done());
    });

    describe('GET /api/users', () => {
        it('Expect to return status 200', (done) => {
            request(app)
                .get('/api/users')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('Expect to return users array', (done) => {
            request(app)
                .get('/api/users')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.body).to.be.an.instanceOf(Array);
                    expect(res.body.findIndex(x => {
                        return x.username === user.username &&
                            x.password === user.password;
                    })).to.equal(0);

                    return done();
                });
        });
    });

    describe('PUT /api/profile', () => {
        it('Expect if not authenticated to return status 401', (done) => {
            request(app)
                .put('/api/profile')
                .expect(401)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('Expect if not authenticated to return correct message', (done) => {
            request(app)
                .put('/api/profile')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.text).to.be.deep.equal('You must be logged in in order to edit profile!');
                    return done();
                });
        });
    });

    describe('PUT /api/users/:id/admin', () => {
        it('Expect if not authenticated to return status 401', (done) => {
            request(app)
                .put('/api/users/123/admin')
                .expect(401)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('Expect if not authenticated to return correct message', (done) => {
            request(app)
                .put('/api/users/123/admin')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.text).to.be.deep.equal('You must be an admin to promote others!');
                    return done();
                });
        });
    });

    describe('GET /api/destinations', () => {
        it('Expect to return status 200', (done) => {
            request(app)
                .get('/api/destinations')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('Expect to return landmarks array', (done) => {
            request(app)
                .get('/api/destinations')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.body).to.be.an.instanceOf(Array);
                    expect(res.body.findIndex(x => x.title === destination.title)).to.equal(0);

                    return done();
                });
        });
    });

    describe('POST /api/destinations/comments/:id', () => {
        it('Expect if not authenticated to return status 401', (done) => {
            request(app)
                .post('/api/destinations/comments/12345')
                .expect(401)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('Expect if not authenticated to return correct message', (done) => {
            request(app)
                .post('/api/destinations/comments/12345')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.text).to.be.deep.equal('You must be logged in in order to comment!');
                    return done();
                });
        });
    });

    describe('PUT /api/destinations/comments/:id', () => {
        it('Expect if comment is incorrect to return status 400', (done) => {
            request(app)
                .put('/api/destinations/comments/' + destination._id)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('Expect if comment is incorrect to return correct message', (done) => {
            request(app)
                .put('/api/destinations/comments/' + destination._id)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.text).to.be.equal('Such comment does not exist');
                    return done();
                });
        });

        it('Expect if landmark is incorrect to return status 400', (done) => {
            request(app)
                .put('/api/destinations/comments/123451234512345123451234')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('Expect if landmark is incorrect to return correct message', (done) => {
            request(app)
                .put('/api/destinations/comments/123451234512345123451234')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.text).to.be.equal('Such landmark does not exist');
                    return done();
                });
        });

        it('Expect if comment is found to return status 200', (done) => {
            destination.comments.push({ text: 'text' });
            db.collection('landmarks').update({ _id: destination._id }, destination)
                .then(() => {
                    request(app)
                        .put('/api/destinations/comments/' + destination._id)
                        .send({ oldText: 'text' })
                        .expect(200)
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }

                            destination.comments.splice(0, 1);
                            return done();
                        });
                });
        });

        it('Expect if comment is correct to return correct response', (done) => {
            const defaultUpdateResponce = '{"n":1,"nModified":1,"ok":1}';

            destination.comments.push({ text: 'text' });
            db.collection('landmarks').update({ _id: destination._id }, destination)
                .then(() => {
                    request(app)
                        .put('/api/destinations/comments/' + destination._id)
                        .send({ oldText: 'text' })
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }

                            destination.comments.splice(0, 1);
                            expect(res.text).to.equal(defaultUpdateResponce);
                            return done();
                        });
                });
        });
    });

    describe('DELETE /api/destinations/comments/:id', () => {
        it('Expect if landmark is not found to return status 400', (done) => {
            request(app)
                .delete('/api/destinations/comments/11c112141151111615118a1b')
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('Expect if landmark is not found to return correct message', (done) => {
            request(app)
                .delete('/api/destinations/comments/11c112141151111615118a1b')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.text).to.be.equal('Landmark does not exist!');
                    return done();
                });
        });

        it('Expect if comment is not found to return status 400', (done) => {
            request(app)
                .delete('/api/destinations/comments/' + destination._id)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('Expect if comment is not found to return correct message', (done) => {
            request(app)
                .delete('/api/destinations/comments/' + destination._id)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.text).to.be.equal('No such comment!');
                    return done();
                });
        });

        it('Expect if comment is found to return status 200', (done) => {
            destination.comments.push({ text: 'text' });
            db.collection('landmarks').update({ _id: destination._id }, destination)
                .then(() => {
                    request(app)
                        .put('/api/destinations/comments/' + destination._id)
                        .send({ oldText: 'text' })
                        .expect(200)
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }

                            destination.comments.splice(0, 1);
                            return done();
                        });
                });
        });

        it('Expect if comment is found but request is auth to return correct response', (done) => {
            const defaultUpdateResponce = '{"n":1,"nModified":1,"ok":1}';

            destination.comments.push({ text: 'text' });
            db.collection('landmarks').update({ _id: destination._id }, destination)
                .then(() => {
                    request(app)
                        .put('/api/destinations/comments/' + destination._id)
                        .send({ oldText: 'text' })
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }

                            destination.comments.splice(0, 1);
                            expect(res.text).to.equal(defaultUpdateResponce);
                            return done();
                        });
                });
        });
    });
});
