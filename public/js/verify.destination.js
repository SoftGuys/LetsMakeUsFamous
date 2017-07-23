/* globals $*/
const VERIFY_VISITED_DESTINATION_URL = 'localhost:3001/api/destinations/';

$(() => {
    'use strict';

    const locationLoadPromise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => resolve(pos));
    });

    const getLocationCoordinates = (position) => {
        const coordinates = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
        };

        return coordinates;
    };

    locationLoadPromise
        .then((pos) => getLocationCoordinates(pos));

    $('#btn-upload-destination-picture').on('change', (ev) => {
        const clickedInput = ev.target;
        const file = clickedInput.files[0];
        const landmarkId = $(clickedInput).attr('data-destination-id');

        locationLoadPromise
            .then((pos) => getLocationCoordinates(pos))
            .then((coordinates) => {
                const body = {
                    landmarkId,
                    coordinates,
                };
                console.log(VERIFY_VISITED_DESTINATION_URL + landmarkId);
                console.log(body);
                $.ajax({
                    url: VERIFY_VISITED_DESTINATION_URL + landmarkId,
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(body),
                    success: (data) => {
                        console.log('success');
                    },
                    error: (err) => {
                        console.log(err);
                        console.log('fail');
                    },
                });
            });
    });
});
