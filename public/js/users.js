/* globals $ io toastr requester */
// eslint-disable-next-line
var socket = io.connect('http://localhost:3001');

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

    $('.container').on('click', '#add-friend', (event) => {
        event.preventDefault();

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
            .find('#add-friend')
            .html('Chat')
            .attr('id', 'chat');

        $('.notification-alert').removeClass('hidden');
        $('#alerts').append(
            $('<li>').append(
                $('<a>')
                .attr('href', '#')
                .addClass('alert')
                .addClass('glyphicon')
                .addClass('glyphicon-user')
                .html(`${sender.username} added you as a friend!`))
        );
    });

    $('#users-search').on('click', () => {
        requester.getJSON('/api/users')
            .then((users) => {
                return users.map((x) => x.username);
            })
            .then((usernames) => {
                $('#users-search').autocomplete({
                    source: usernames,
                });
            });
    });
});
