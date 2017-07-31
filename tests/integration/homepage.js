const request = require('supertest');

describe('Home tests', () => {
    const connectionString = 'mongodb://localhost/tourist-sites-test';
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
        it('expect to return 301 and redirect to home', (done) => {
            request(app)
                .get('/')
                .expect(301, done);
        });
    });
});

//     describe('GET /about', () => {
//         it('expect to return 200 and show about', (done) => {
//             request(app)
//                 .get('/home')
//                 .expect(200)
//                 .end((err, res) => {
//                     if (err) {
//                         return done(err);
//                     }

//                     return done();
//                 });
//         });
//     });
//     describe('GET /home', () => {
//         it('expect to go to home and return 200', (done) => {
//             request(app)
//                 .get('/home')
//                 .expect(200)
//                 .end((err, res) => {
//                     if (err) {
//                         return done(err);
//                     }

//                     return done();
//                 });
//         });
//     });
// });
