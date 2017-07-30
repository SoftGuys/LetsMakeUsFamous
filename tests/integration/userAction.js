const request = require('supertest');

describe('/User Actions Tests', () => {
    const connectionString = 'mongodb://localhost/testing';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../database')(connectionString))
            .then((db) => require('../../data')(db))
            .then((data) => require('../../app')(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('GET /', () => {
        it('expect to return 200 and redirect to users', (done) => {
            request(app)
                .get('/users', (req, res) => {
                    req.isAuthenticated();
                })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
