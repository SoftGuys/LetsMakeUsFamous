/* globals $ io */
const socket = io.connect('http://localhost:3001');

$(() => {
    $('#friends').on('click', '.friend-panel', (event) => {
        const friendId = $(event.currentTarget).attr('user-id');
        $('#messages-box').attr('current-friend', friendId);

        socket.emit('show-messages', friendId);
    });

    const appendMessage = (msgInfo) => {
        $('#messages')
            .attr('user', msgInfo.username)
            .append(
                $('<li>')
                .addClass(msgInfo.senderId)
                .append(
                    $('<div>')
                    .addClass('pull-left')
                    .append(
                        $('<img>')
                        .attr('src', msgInfo.pictureUrl)
                        .addClass('chat-pic'))
                    .append(
                        $('<label>')
                        .html(msgInfo.username))
                    .append(
                        $('<span>')
                        .html(msgInfo.time)
                        .addClass('pull-right')))
                .append(
                    $('<div>')
                    .append(
                        $('<span>')
                        .html(msgInfo.message)))
            );

        const friendId = $('#messages-box').attr('current-friend');
        if (typeof friendId === 'undefined' || msgInfo.senderId === friendId) {
            $(`.${msgInfo.senderId}`).addClass('recever');
        } else {
            $(`.${msgInfo.senderId}`).addClass('sender');
        }
    };

    socket.on('show-messages', (messages) => {
        $('#input-message').removeClass('hidden');

        $('#messages').removeClass('hidden').empty();
        messages.forEach(appendMessage);
    });

    socket.on('send-message', (message) => {
        appendMessage(message);
    });

    socket.on('message-notification', (senderName) => {
        $('.notification-alert').removeClass('hidden');
        $('#alerts').append(
            $('<li>')
            .addClass('btn')
            .addClass('alert')
            .html(`${senderName} texted you!`)
        );
    });

    $('#input-message').on('click', () => {
        const friend = $('#messages').attr('user');

        $('#alerts').children().each((_, element) => {
            const $element = $(element);
            if ($element.html().includes(`${friend} texted you!`)) {
                $element.remove();
                socket.emit('remove-notification', $element.html());
            }
        });

        if ($('#alerts').children().length === 1) {
            $('.notification-alert').addClass('hidden');
            $('#no-alert').removeClass('hidden');
        }
    });

    $('#send-message').on('click', (event) => {
        event.preventDefault();

        const friendId = $('#messages-box').attr('current-friend');
        const message = $('#message').val();
        $('#message').val('');

        socket.emit('send-message', { friendId, message });
    });
});
