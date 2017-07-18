/* globals $ */

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

            const comment = {
                text: commentText,
                postedOn: new Date(),
            };

            const url = ADD_COMMENT_URL + 'comments/' + landmarkId;
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(comment),
                contentType: 'application/json',
                success: (data) => {
                    console.log('success');
                },
            });
        });
});
