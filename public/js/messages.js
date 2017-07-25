/* globals $ toastr io */
const socket = io.connect('http://localhost:3001');

$(() => {
    $('#friends').on('click', '.friend-panel', (event) => {
        const friendId = $(event.currentTarget).attr('user-id');
        $('#messages-box').attr('current-friend', friendId);

        socket.emit('show-messages', friendId);
    });

    const appendMessage = (msgInfo) => {
        $('#messages').append(
            $('<li>')
            .addClass(msgInfo.senderId)
            .append(
                $('<div>')
                .addClass('pull-left')
                .append(
                    $('<img>')
                    .attr('src', msgInfo.pictureUrl)
                    .addClass('chat-pic'))
                .append($('<label>').html(msgInfo.username))
                .append($('<span>').html(msgInfo.time).addClass('pull-right')))
            .append(
                $('<div>')
                .append($('<span>').html(msgInfo.message)))
        );

        const friendId = $('#messages-box').attr('current-friend');
        if (msgInfo.senderId === friendId) {
            $(`.${msgInfo.senderId}`).addClass('recever');
        } else {
            $(`.${msgInfo.senderId}`).addClass('sender');
        }
    };

    socket.on('show-messages', (messages) => {
        $('#messages').empty();
        messages.forEach(appendMessage);
    });

    socket.on('send-message', (message) => {
        appendMessage(message);
    });

    $('#send-message').on('click', (event) => {
        event.preventDefault();

        const friendId = $('#messages-box').attr('current-friend');
        const message = $('#message').val();
        $('#message').val('');

        socket.emit('send-message', { friendId, message });
    });
});
