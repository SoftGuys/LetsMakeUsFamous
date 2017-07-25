/* globals $ google map*/
const mapBtn = $('#googleMapActivate');
const modalContext = $('#myModal');
mapBtn.on('click', function() {
    $('#myModal').modal('show');
    setTimeout(()=>{
        const longitude = Number($('#cordslong').attr('data-lon'));
        const latitude = Number($('#cordslat').attr('data-lat'));
        $('#address').hide();
        $('#submit').hide();
        $('#floating-panel').hide();
        $('.modal-header').css('background-color', 'black');
        $('.modal-header').css('color', '#ead0af');
        $('.modal-body').css('background-color', 'black');
        $('.modal-footer').css('background-color', 'black');
        $('.btn-default').css('background-color', '#6a0f0e');
        $('.btn-default').css('background-color', '#ead0af');
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            center: { lat: latitude, lng: longitude },
        });
        const marker = new google.maps.Marker({
            map: map,
            position: map.center,
            // Animation can be DROP,BOUNCE,no,po
            animation: google.maps.Animation.BOUNCE,
        });
        // google.maps.event.trigger(map, 'resize');
    }, 300);
});
