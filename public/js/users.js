/* globals $ io toastr */
const socket = io.connect('http://localhost:3001');

$(() => {
    $('#alert-dropdown').on('click', (event) => {
        event.preventDefault();
        $('.notification-alert').addClass('hidden');

        if ($('#alerts').children().length > 1) {
            $('#no-alert').addClass('hidden');
        }
    });

    $('#alerts').on('click', '.alert', (event) => {
        event.preventDefault();

        $(event.target).remove();
        if ($('#alerts').children().length === 1) {
            $('#no-alert').removeClass('hidden');
        }

        socket.emit('remove-notification', $(event.target).first().html());
    });

    $('.container').on('click', '#add-friend', (event) => {
        const friendId = $(event.target)
            .html('Chat')
            .attr('id', 'chat')
            .parents('.user-id')
            .attr('user-id');

        socket.emit('add-friend', friendId);
        toastr.success('You added new friend!');
    });

    socket.on('add-friend', (sender) => {
        $('.user-id[user-id=' + sender._id.toString() + ']')
            .find('#add-friend').html('Chat').attr('id', 'chat');

        $('.notification-alert').removeClass('hidden');
        $('#alerts').append(
            $('<li>')
            .addClass('btn')
            .addClass('alert')
            .html(`${sender.username} added you as a friend!`)
        );
    });
});
