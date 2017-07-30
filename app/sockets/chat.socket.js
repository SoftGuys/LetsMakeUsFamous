const attachSocket = (io, socket, passportSocket, { users }) => {
    socket.on('show-messages', (friendId) => {
        users.findById(socket.request.user._id.toString())
            .then((user) => {
                return user.friends
                    .find((x) => x._id.toString() === friendId);
            })
            .then((friend) => {
                const messages = friend.messages;
                socket.emit('show-messages', messages);
            });
    });

    socket.on('send-message', ({ friendId, message }) => {
        Promise.all([
                users.findById(socket.request.user._id.toString()),
                users.findById(friendId),
            ])
            .then(([user, friend]) => {
                users.addChatMessage(user, friend, message)
                    .then((messageModel) => {
                        socket.emit('send-message', messageModel);

                        passportSocket.filterSocketsByUser(io,
                                (userModel) => {
                                    return userModel._id.toString() ===
                                        friend._id.toString();
                                })
                            .forEach((sock) => {
                                sock.emit('send-message', messageModel);
                                if (messageModel.newMessage) {
                                    sock.emit('message-notification',
                                        messageModel.username);
                                }
                            });
                    });
            });
    });
};

module.exports = attachSocket;
