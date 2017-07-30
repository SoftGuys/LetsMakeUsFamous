/* globals $ toastr requester domAppender socket */

const COMMENT_URL = 'http://localhost:3001/api/destinations/comments/';
$(() => {
    $('.landmark-description').popover({ container: 'body' });

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
                    domAppender.appendDestinationComment(
                        data, $commentsContainer);

                    socket.emit('add-comment', landmarkId);
                    toastr.success('Comment added successfully!');
                })
                .catch((err) => {
                    toastr.error(err.responseText);
                });
        });

    $('.destination-comments').on('click', '.btn-delete-comment', (ev) => {
        console.log(ev.target);
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

        $saveCommentButton.one('click', (e) => {
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

                    $saveCommentButton.addClass('hidden').unbind();
                    $exitSaveButton.addClass('hidden').unbind();
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

        $exitSaveButton.one('click', (e) => {
            $saveCommentButton.addClass('hidden').unbind();
            $exitSaveButton.addClass('hidden').unbind();
            $clickedButton.removeClass('hidden');
            $deleteCommentButton.removeClass('hidden');

            $textArea.replaceWith($commentParagraph);
        });
    });
});
