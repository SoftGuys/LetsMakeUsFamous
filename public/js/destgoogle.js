/* globals google $ */
function initMap() {
    const cords = $('#landmarkTitle').text();
    const longitude = Number($('#cordslong').attr('data-lon')).toFixed(3);
    const latitude = Number($('#cordslat').attr('data-lat')).toFixed(3);
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: latitude, lng: longitude },
    });

    const geocoder = new google.maps.Geocoder();

    setTimeout((x) => {
        geocodeAddress(geocoder, map);
    }, 300);
}

function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                // Animation can be DROP,BOUNCE,no,po
                animation: google.maps.Animation.BOUNCE,
            });
        } else {
            console.log('Geocode was not successful for the following reason:' +
                ' ' + status);
        }
    });
}


