/* globals $ google map*/
const mapBtn = $('#googleMapActivate');
const modalContext = $('#myModal');
mapBtn.on('click', function() {
    $('#myModal').modal('show');
    setTimeout(()=>{
        $('#address').hide();
        $('#submit').hide();
        $('#floating-panel').hide();
        $('.modal-header').css('background-color', 'black');
        $('.modal-header').css('color', '#ead0af');
        $('.modal-body').css('background-color', 'black');
        $('.modal-footer').css('background-color', 'black');
        $('.btn-default').css('background-color', '#6a0f0e');
        $('.btn-default').css('background-color', '#ead0af');
        google.maps.event.trigger(map, 'resize');
    }, 300);
});
