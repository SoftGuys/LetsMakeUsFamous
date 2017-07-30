const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const cookieParser = require('cookie-parser');
const passportSocket = require('passport.socketio');

const config = require('../../config');

const configSocket = (app, data, attachSockets) => {
    // eslint-disable-next-line
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    const onAuthorizeSuccess = (info, accept) => {
        accept(null, true);
    };

    const onAuthorizeFail = (info, message, error, accept) => {
        if (error) {
            throw new Error(message);
        }

        accept(null, false);
    };

    io.use(passportSocket.authorize({
        cookieParser,
        store: new MongoStore({ url: config.DB_LOCAL_CONNECTION_STRING }),
        secret: 'bobidjei',
        success: onAuthorizeSuccess,
        error: onAuthorizeFail,
    }));

    io.on('connection', (socket) => {
        attachSockets(io, socket, passportSocket, data);
    });

    return server;
};

module.exports = configSocket;
