/* globals  $ */
const mapBtn = $('#googleMapActivate');
const modalContext = $('#myModal');
mapBtn.on('click', function() {
    $('#myModal').modal('show');
});
