/* globals $ domAppender socket */

$(() => {
    $('#friends').on('click', '.friend-panel', (event) => {
        const friendId = $(event.currentTarget).attr('user-id');
        $('#messages-box').attr('current-friend', friendId);

        socket.emit('show-messages', friendId);
    });

    socket.on('show-messages', (messages) => {
        $('#input-message').removeClass('hidden');

        $('#messages').removeClass('hidden').empty();
        if (!messages.length) {
            $('#messages').append(
                $('<li>')
                .addClass('no-messages')
                .addClass('list-group-item')
                .addClass('list-group-item-default')
                .addClass('text-center')
                .text('You have no messages yet.'));

            return;
        }

        messages.forEach(domAppender.appendChatMessage);
        $('#messages-box')
            .animate({ scrollTop: $('#messages-box').prop('scrollHeight') }, 0);
    });

    socket.on('send-message', (message) => {
        $('.no-messages').addClass('hidden');

        domAppender.appendChatMessage(message);
        $('#messages-box')
            .animate({ scrollTop: $('#messages-box').prop('scrollHeight') }, 0);
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

$(() => {
    $('.msg-friend').click();
});
