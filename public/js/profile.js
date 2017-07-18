/* globals $ */
$('document').ready(() => {
    $('#profile-picture').on('change', (target) => {
        $('#profile-picture-form').submit();
    });
});
