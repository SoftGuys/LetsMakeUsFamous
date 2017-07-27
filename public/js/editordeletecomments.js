/* globals $ toastr*/
const EDIT_DELETE_URL = 'http://localhost:3001/api/destinations/';
$('.btn').on('click', (event) => {
    const target = event.target;
    const targetClass = $(target).attr('class');
    const landmarkId = $('.btn.btn-success.btn-add-destination-comment')
        .attr('data-landmarkId');
    const parrent = $(target).parent().parent().parent();
    const span = parrent.children();
    const paraText = span[0];
    const text = span[0].textContent;
    const comment = {
        text: text,
        id: landmarkId,
    };

    if (targetClass === 'glyphicon glyphicon-pencil blue' ||
        targetClass === 'btn btn-primary btn-ms blue') {
        console.log('sinio');
        // eslint-disable-next-line
        $(span[0]).replaceWith($(`<textarea rows="4" cols="50" value="${$(span[0]).text()}">`)
            .css('background-color', '73ff00')
            .attr('id', 'edit-comment')
            .val(text));
        $('.Save').show();
    } else if (targetClass === 'glyphicon glyphicon-trash red' ||
        targetClass === 'btn btn-danger btn-ms red') {
        console.log('cherveno');
        const url = EDIT_DELETE_URL + 'comments/' + landmarkId;
        $.ajax({
            url: url,
            type: 'DELETE',
            data: JSON.stringify(comment),
            contentType: 'application/json',
            success: (data) => {
                toastr.success('Comment deleted successfully!');
                remove(parrent);
            },
            error: (error) => {
                console.log(error);
                toastr.error(error.responseText);
            },
        });
    } else if (targetClass === 'glyphicon glyphicon-ok' ||
        targetClass === 'btn btn-primary btn-ms green Save') {
        console.log('zeleno');
        const newText = $('#edit-comment').val();
        const user = $(event.target).parent().prev().prev().prev().text();
        comment.user = user;
        comment.newText = newText;
        comment.oldText = $('#edit-comment').attr('value');
        console.log(comment);

        const url = EDIT_DELETE_URL + 'comments/' + landmarkId;
        $.ajax({
            url: url,
            type: 'PUT',
            data: JSON.stringify(comment),
            contentType: 'application/json',
            success: (data) => {
                $('.Save').hide();
                toastr.success('Comment Edited successfully!');
                replaceTextAreaWithSpan(comment);
            },
            error: (error) => {
                console.log(error);
                toastr.error(error.responseText);
            },
        });
    }
});
function replaceTextAreaWithSpan(comment) {
    // eslint-disable-next-line
    // $(span[0]).replaceWith($(`<textarea rows="4" cols="50" value="${$(span[0]).text()}">`)
    $('#edit-comment').replaceWith($(`<p><span>${comment.newText}</span></p>`));
}

function remove(data) {
    data.hide();
}
