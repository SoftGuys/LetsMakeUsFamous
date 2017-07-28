/* globals $ toastr io requester moment */
// eslint-disable-next-line
var socket = io.connect('http://localhost:3001');
const ADD_COMMENT_URL = 'http://localhost:3001/api/destinations/';

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

            const url = ADD_COMMENT_URL + 'comments/' + landmarkId;
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
        $destinationCommentDetails
            .append(' ' + moment(comment.postedOn).fromNow() + ' ');
        $userImage.appendTo($destinationCommentDetails);
        $userHref.appendTo($destinationCommentDetails);

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

    $('.landmark-description').popover();
});
