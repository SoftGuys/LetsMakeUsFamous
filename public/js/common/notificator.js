/* globals $ domAppender io */
const socket = io.connect();

$(() => {
    $('#alert-dropdown').on('click', (event) => {
        event.preventDefault();
        $('.notification-alert').addClass('hidden');

        if ($('#alerts').children().length > 1) {
            $('#no-alert').addClass('hidden');
        } else {
            $('#no-alert').removeClass('hidden');
        }
    });

    $('#alerts').on('click', '.alert', (event) => {
        event.preventDefault();
        event.stopPropagation();

        $(event.target).parent().remove();
        if ($('#alerts').children().length === 1) {
            $('#no-alert').removeClass('hidden');
        }

        socket.emit('remove-notification', $(event.target).first().html());
    });

    socket.on('add-friend', (sender) => {
        $('.user-id[user-id=' + sender._id.toString() + ']')
            .find('#add-friend')
            .html('Chat')
            .attr('id', 'chat');

        domAppender.appendNotification(
            'glyphicon-user',
            `${sender.username} added you as a friend!`);
    });

    socket.on('message-notification', (senderName) => {
        domAppender.appendNotification(
            'glyphicon-pencil',
            `${senderName} texted you!`);
    });

    socket.on('add-comment', ({ senderName, landmarkTitle }) => {
        domAppender.appendNotification(
            'glyphicon-hand-left',
            `${senderName} commented on ${landmarkTitle}!`);
    });
});
