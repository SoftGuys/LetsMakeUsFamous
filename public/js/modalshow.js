/* globals $ google map*/
const mapBtn = $('#googleMapActivate');
const modalContext = $('#myModal');
mapBtn.on('click', () => {
    $('#myModal').modal('show');
    setTimeout(() => {
        const longitude = Number($('#cordslong').attr('data-lon'));
        const latitude = Number($('#cordslat').attr('data-lat'));

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
