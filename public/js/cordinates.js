/* globals google $ */
$(() => {
    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser
    // to locate you.

    function initMap() {
        const infoWindow = new google.maps.InfoWindow;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                // infoWindow.open(map);
                if (document.getElementById('location') !== null) {
                    document.getElementById('location').innerHTML =
                        `Longtitude:${pos.lat} Latitude${pos.lng}`;
                }

                // }, function() {
                //     handleLocationError(true, infoWindow, map.getCenter());
                // });
            });
            // // Browser doesn't support Geolocation
            // handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //     infoWindow.setPosition(pos);
    //     infoWindow.setContent(browserHasGeolocation ?
    //         'Error: The Geolocation service failed.' :
    //         'Error: Your browser doesn\'t support geolocation.');
    // }

    initMap();
});
