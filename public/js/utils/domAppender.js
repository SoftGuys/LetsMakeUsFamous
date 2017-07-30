/* globals $ moment */
const domAppender = (() => {
    const appendChatMessage = (msgInfo) => {
        $('#messages')
            .attr('user', msgInfo.username)
            .append(
                $('<li>')
                .addClass(msgInfo.senderId)
                .addClass('row')
                .addClass('list-group-item')
                .append(
                    $('<div>')
                    .append(
                        $('<img>')
                        .attr('src', msgInfo.pictureUrl)
                        .addClass('chat-pic')
                        .addClass('img-thumbnail'))
                    .append(
                        $('<label>')
                        .addClass('chat-username')
                        .text(msgInfo.username))
                    .append(
                        $('<span>')
                        .addClass('chat-time')
                        .text(moment(msgInfo.time).fromNow())))
                .append(
                    $('<div>')
                    .addClass('col-sm-10')
                    .append(
                        $('<span>')
                        .addClass('chat-message')
                        .text(msgInfo.message)))
            );

        const friendId = $('#messages-box').attr('current-friend');
        if (typeof friendId === 'undefined' || msgInfo.senderId === friendId) {
            $(`.${msgInfo.senderId}`)
                .addClass('recever')
                .addClass('list-group-item-danger')
                .addClass('pull-right')
                .find('.chat-pic, .chat-username')
                .addClass('pull-right')
                .siblings('.chat-time')
                .addClass('pull-left')
                .parents('.list-group-item')
                .find('.chat-message')
                .addClass('pull-right');
        } else {
            $(`.${msgInfo.senderId}`)
                .addClass('sender')
                .addClass('list-group-item-info')
                .addClass('pull-left')
                .find('.chat-pic, .chat-username')
                .addClass('pull-left')
                .siblings('.chat-time')
                .addClass('pull-right')
                .parents('.list-group-item')
                .find('.chat-message')
                .addClass('pull-left');
        }
    };

    const appendDestinationComment = (comment, rootElement) => {
        const loggedUsername = $('.destination-comments')
            .attr('data-logged-username');

        const $destinationComment = $('<div />')
            .addClass('col-md-8')
            .addClass('destination-comment');
        const $destinationCommentText = $('<p />')
            .addClass('destination-comment-text')
            .text(comment.text);
        const $destinationCommentDetails = $('<p />')
            .addClass('destination-comment-details')
            .addClass('text-primary');
        const $timeGlyphicon = $('<span />')
            .addClass('glyphicon')
            .addClass('glyphicon-time');
        const $userImage = $('<img/>')
            .addClass('img-comment-user')
            .attr('src', comment.user.pictureUrl);
        const $userHref = $('<a />')
            .attr('href', '/users/' + comment.user._id)
            .text(' ' + comment.user.username);
        const $trashSpan = $('<span/>')
            .addClass('glyphicon glyphicon-trash');
        const $deleteCommentButton = $('<button>')
            .addClass('btn btn-xs')
            .addClass('btn-danger')
            .addClass('btn-delete-comment');
        const $pencilSpan = $('<span/>')
            .addClass('glyphicon glyphicon-pencil');
        const $editCommentButton = $('<button>')
            .addClass('btn btn-xs')
            .addClass('btn-primary')
            .addClass('btn-edit-comment')
            .attr('data-author', loggedUsername);
        const $okSpan = $('<span/>')
            .addClass('glyphicon glyphicon-ok');
        const $saveCommentButton = $('<button>')
            .addClass('btn btn-xs')
            .addClass('btn-success')
            .addClass('btn-save-comment')
            .addClass('hidden')
            .attr('data-author', loggedUsername);
        const $removeSpan = $('<span/>')
            .addClass('glyphicon glyphicon-remove');
        const $exitSaveButton = $('<button>')
            .addClass('btn btn-xs')
            .addClass('btn-danger')
            .addClass('btn-exit-save')
            .addClass('hidden');

        $trashSpan.appendTo($deleteCommentButton);
        $pencilSpan.appendTo($editCommentButton);
        $okSpan.appendTo($saveCommentButton);
        $removeSpan.appendTo($exitSaveButton);

        $timeGlyphicon.appendTo($destinationCommentDetails);
        $destinationCommentDetails
            .append(' ' + moment(comment.postedOn).fromNow() + ' ');
        $userImage.appendTo($destinationCommentDetails);
        $userHref.appendTo($destinationCommentDetails);
        $editCommentButton.appendTo($destinationCommentDetails);
        $deleteCommentButton.appendTo($destinationCommentDetails);
        $saveCommentButton.appendTo($destinationCommentDetails);
        $exitSaveButton.appendTo($destinationCommentDetails);

        $destinationCommentText.appendTo($destinationComment);
        $destinationCommentDetails.appendTo($destinationComment);
        $('<hr>').appendTo($destinationComment);

        $destinationComment.prependTo($(rootElement));
    };

    const appendNotification = (glyphicon, alert) => {
        $('.notification-alert').removeClass('hidden');
        $('#alerts').append(
            $('<li>').append(
                $('<a>')
                .attr('href', '#')
                .addClass('alert')
                .addClass('glyphicon')
                .addClass(glyphicon)
                .text(alert))
        );
    };

    return {
        appendChatMessage,
        appendNotification,
        appendDestinationComment,
    };
})();
