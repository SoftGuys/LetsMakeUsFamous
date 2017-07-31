/* globals $ google map*/
$('#googleMapActivate').on('click', () => {
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
            animation: google.maps.Animation.BOUNCE,
        });
    }, 300);
});
