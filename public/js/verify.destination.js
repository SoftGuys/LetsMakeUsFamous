/* globals $*/

$(() => {
    'use strict';

    const locationLoadPromise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => resolve(pos));
    });

    const getLocationCoordinates = (position) => {
        const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };

        return coordinates;
    };

    locationLoadPromise
        .then((pos) => getLocationCoordinates(pos));

    $('#btn-upload-destination-picture').on('change', (ev) => {
        console.log('here');
        const $form = $('#verify-destination-form');
        locationLoadPromise
            .then((pos) => getLocationCoordinates(pos))
            .then(({ longitude, latitude }) => {
                $('<input />').attr({
                        name: 'longitude',
                        value: longitude,
                    })
                    .addClass('hidden')
                    .appendTo($form);

                $('<input />').attr({
                        name: 'latitude',
                        value: latitude,
                    })
                    .addClass('hidden')
                    .appendTo($form);

                $form.submit();
            });
    });
});
