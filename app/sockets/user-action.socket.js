const attachSocket = (io, socket, passportSocket, { users, landmarks }) => {
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

    socket.on('add-comment', (landmarkId) => {
        landmarks.findById(landmarkId)
            .then((landmark) => {
                const notification = socket.request.user.username +
                    ' commented on ' + landmark.title + '!';

                return Promise.all(
                        landmark
                        .comments
                        .filter((x) => x.user._id.toString() !==
                            socket.request.user._id.toString())
                        .map((x) => users.findById(x.user._id.toString()))
                    )
                    .then((commenters) => {
                        commenters.forEach((x) => {
                            x.notifications.push(notification);
                            users.update(x);
                        });

                        return commenters;
                    })
                    .then((commenters) => {
                        passportSocket.filterSocketsByUser(io,
                                (userModel) => {
                                    return commenters
                                        .some((x) => x._id.toString() ===
                                            userModel._id.toString());
                                })
                            .forEach((sock) => {
                                sock.emit('add-comment', {
                                    landmarkTitle: landmark.title,
                                    senderName: socket
                                        .request
                                        .user
                                        .username,
                                });
                            });
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
};

module.exports = attachSocket;
