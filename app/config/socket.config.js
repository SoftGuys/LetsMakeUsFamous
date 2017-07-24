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

                    return friend;
                })
                .then((targetUser) => {
                    passportSocket.filterSocketsByUser(io, (user) => {
                            return user._id.toString() ===
                                targetUser._id.toString();
                        })
                        .forEach((sock) => {
                            sock.emit('add-friend', socket.request.user);
                        });
                });
        });

        socket.on('remove-notification', (notification) => {
            const notifications = socket.request.user.notifications;
            const index = notifications.findIndex((x) => x === notification);
            notifications.splice(index, 1);

            users.findById(socket.request.user._id.toString())
                .then((user) => {
                    user.notifications = notifications;
                    users.update(user);
                });
        });
    });

    return server;
};

module.exports = configSocket;
