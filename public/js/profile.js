/* globals $ */
$(() => {
    $('#profile-picture').on('change', () => {
        $('#profile-picture-form').submit();
    });
});
