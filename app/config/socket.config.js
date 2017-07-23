const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const passportSocket = require('passport.socketio');
const config = require('../../config');

const configSocket = (app, { users }) => {
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
        store: new MongoStore({ url: config.LOCAL_CONNECTION_STRING }),
        secret: 'bobidjei',
        success: onAuthorizeSuccess,
        error: onAuthorizeFail,
    }));

    io.on('connection', (socket) => {
        socket.on('add-friend', (friendId) => {
            users.findById(friendId)
                .then((friend) => {
                    users.addFriendship(
                        socket.request.user,
                        friend
                    );
                });

            socket.broadcast.emit('add-friend', 'You have new friend request!');
        });
    });

    return server;
};

module.exports = configSocket;
