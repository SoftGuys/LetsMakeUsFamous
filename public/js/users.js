/* globals $ io toastr */
const socket = io.connect('http://localhost:3001');

$(() => {
    $('#alert-dropdown').on('click', (event) => {
        event.preventDefault();
        $('.notification-alert').addClass('hidden');

        if ($('#alerts').children().length === 0) {
            $('#alerts').append($('<li>').html('No alerts!'));
            return;
        }
    });

    $('#add-friend').on('click', (event) => {
        const friendId = $(event.target).parents('#user-id').attr('user-id');

        socket.emit('add-friend', friendId);
        toastr.success('You added new friend!');
    });

    socket.on('add-friend', (message) => {
        $('.notification-alert').removeClass('hidden');
        $('#alerts').append(
            $('<li>')
            .addClass('btn')
            .on('click', (ev) => {
                $(ev.target).remove();
            })
            .append(
                $('<a>')
                .html(message))
        );
    });
});
