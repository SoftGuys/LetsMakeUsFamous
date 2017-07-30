/* globals $ toastr io requester moment */
// eslint-disable-next-line
var socket = io.connect('http://localhost:3001');
const COMMENT_URL = 'http://localhost:3001/api/destinations/comments/';

$(() => {
    socket.on('add-comment', ({ senderName, landmarkTitle }) => {
        $('.notification-alert').removeClass('hidden');
        $('#alerts').append(
            $('<li>').append(
                $('<a>')
                .attr('href', '#')
                .addClass('alert')
                .addClass('glyphicon')
                .addClass('glyphicon-hand-left')
                .html(`${senderName} commented on ${landmarkTitle}!`))
        );
    });

    $('.btn-comment-form').on('click', (ev) => {
        $('#add-destination-comment').toggleClass('hidden');
    });

    $('.btn-add-destination-comment')
        .on('click', (ev) => {
            const $clickedButton = $(ev.target);
            const landmarkId = $clickedButton.attr('data-landmarkId');
            const commentText = $('textarea').val();
            $('textarea').val('');
            $('#add-destination-comment').toggleClass('hidden');

            const comment = {
                text: commentText,
                postedOn: Date.now(),
            };

            const url = COMMENT_URL + landmarkId;
            const $commentsContainer = $('.destination-comments');

            requester.postJSON(url, comment)
                .then((data) => {
                    displayComment(data, $commentsContainer);
                    socket.emit('add-comment', landmarkId);
                    toastr.success('Comment added successfully!');
                })
                .catch((err) => {
                    toastr.error(err.responseText);
                });
        });

    const displayComment = (comment, rootElement) => {
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

    $('#landmarks-search').on('click', () => {
        requester.getJSON('/api/landmarks')
            .then((landmarks) => {
                return landmarks.map((x) => x.title);
            })
            .then((titles) => {
                $('#landmarks-search').autocomplete({
                    source: titles,
                });
            });
    });

    $('.landmark-description').popover({ container: 'body' });

    $('.destination-comments').on('click', '.btn-delete-comment', (ev) => {
        const $clickedButton = $(ev.target);

        const landmarkId =
            $('.btn-add-destination-comment')
            .attr('data-landmarkId');

        const url = COMMENT_URL + landmarkId;
        const commentText = $clickedButton
            .parent('.destination-comment-details')
            .prev()
            .text();

        const comment = {
            text: commentText,
        };

        requester.deleteJSON(url, comment)
            .then((_) => {
                toastr.success('Comment deleted successfully!');
                $clickedButton
                    .parent('.destination-comment-details')
                    .parent()
                    .remove();
            })
            .catch((message) => {
                const errMessage = typeof message === 'string' ?
                    message :
                    'You are not allowed to delete this comment!';
                toastr.error(errMessage);
            });
    });

    $('.destination-comments').on('click', '.btn-edit-comment', (ev) => {
        const $clickedButton = $(ev.target);

        const landmarkId =
            $('.btn-add-destination-comment')
            .attr('data-landmarkId');

        const loggedUsername = $('.destination-comments')
            .attr('data-logged-username');
        const authorUsername = $clickedButton
            .attr('data-author');
        const isAdmin = $('.destination-comments')
            .attr('data-is-admin') === 'true';

        if (authorUsername !== loggedUsername && !isAdmin) {
            toastr.error(
                'You must be the author of the comment to edit it!');
            return;
        }

        // old comment paragraph container
        const $commentParagraph = $clickedButton
            .parent('.destination-comment-details')
            .prev();
        const commentText = $commentParagraph.text();

        // text area to put on paragph comments's place
        const $textArea = $('<textarea/>')
            .addClass('form-control')
            .addClass('edit-comment-text-area')
            .val(commentText);
        $commentParagraph.replaceWith($textArea);

        $clickedButton.addClass('hidden');
        const $deleteCommentButton = $clickedButton
            .next()
            .addClass('hidden');

        const $saveCommentButton = $clickedButton
            .nextAll('.btn-save-comment')
            .removeClass('hidden');
        const $exitSaveButton = $clickedButton
            .nextAll('.btn-exit-save')
            .removeClass('hidden');

        $saveCommentButton.on('click', (e) => {
            const newCommentText = $textArea.val();
            const oldCommentText = $commentParagraph.text();
            const comment = {
                newText: newCommentText,
                oldText: oldCommentText,
            };

            const url = COMMENT_URL + landmarkId;
            requester.putJSON(url, comment)
                .then((result) => {
                    toastr.success('Comment edited successfully!');
                    $saveCommentButton.addClass('hidden');
                    $exitSaveButton.addClass('hidden');
                    $clickedButton.removeClass('hidden');
                    $deleteCommentButton.removeClass('hidden');

                    $commentParagraph.text(newCommentText);
                    $textArea.replaceWith($commentParagraph);
                })
                .catch((err) => {
                    const errMessage = typeof err === 'string' ?
                        err :
                        'Cannot edit comment!';
                    toastr.error(errMessage);
                });
        });

        $exitSaveButton.on('click', (e) => {
            $saveCommentButton.addClass('hidden');
            $exitSaveButton.addClass('hidden');
            $clickedButton.removeClass('hidden');
            $deleteCommentButton.removeClass('hidden');

            $textArea.replaceWith($commentParagraph);
        });
    });
});
