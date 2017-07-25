/* globals $ toastr */
const ADD_COMMENT_URL = 'http://localhost:3001/api/destinations/';

$(() => {
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
                postedOn: new Date(),
            };

            const url = ADD_COMMENT_URL + 'comments/' + landmarkId;
            const $commentsContainer = $('.destination-comments');
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(comment),
                contentType: 'application/json',
                success: (data) => {
                    displayComment(data, $commentsContainer);
                    toastr.success('Comment added successfully!');
                },
                error: (error) => {
                    toastr.error(error.responseText);
                },
            });
        });

    const displayComment = (comment, rootElement) => {
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

        $timeGlyphicon.appendTo($destinationCommentDetails);
        $destinationCommentDetails.append(' ' + comment.postedOn + ' ');
        $userImage.appendTo($destinationCommentDetails);
        $userHref.appendTo($destinationCommentDetails);

        $destinationCommentText.appendTo($destinationComment);
        $destinationCommentDetails.appendTo($destinationComment);
        $('<hr>').appendTo($destinationComment);

        $destinationComment.prependTo($(rootElement));
    };
});
