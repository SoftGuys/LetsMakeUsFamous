/* globals $ toastr*/
const EDIT_DELETE_URL = 'http://localhost:3001/api/destinations/';
$('.btn').on('click', (event) => {
    const target = event.target;
    const targetClass = $(target).attr('class');
    const landmarkId = $('.btn.btn-success.btn-add-destination-comment')
        .attr('data-landmarkId');
    const parrent = $(target).parent().parent().parent();
    const span = parrent.children();
    const text = span[0].textContent;
    const comment = {
        text: text,
        id: landmarkId,
    };

    if (targetClass === 'glyphicon glyphicon-pencil blue' ||
        targetClass === 'btn btn-primary btn-ms blue') {
        console.log('sinio');
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
    }
});

function remove(data) {
    data.hide();
}
