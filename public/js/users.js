/* globals $ toastr requester socket */

$(() => {
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

    $('#users-container').on('click', '.btn-promote-admin', (ev) => {
        const $clickedButton = $(ev.target);
        const userToPromoteId = $clickedButton
            .attr('data-user-id');

        const url = '/api/users/' + userToPromoteId + '/admin';
        requester.putJSON(url)
            .then((res) => {
                toastr.success('Requested user is now an admin!');
                $clickedButton.hide();
            })
            .catch((err) => {
                toastr.error('You do not have rights to promote users!');
            });
    });
});
