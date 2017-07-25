/* globals $ toastr*/

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

    $('#btn-show--mark-visited-modal').on('click', (ev) => {
        $('#verifyDestinationModal').modal('show');
    });

    $('#btn-upload-destination-picture').on('change', (ev) => {
        const fileInput = ev.target;
        const files = fileInput.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                $('#imageToBeUploaded')
                    .attr('src', e.target.result);
            };

            reader.readAsDataURL(files[0]);
        }
    });

    $('#btn-send-verify-destination-picture')
        .on('click', (ev) => {
            const fileInput = document
                .getElementById('btn-upload-destination-picture');

            if (!fileInput.files || !fileInput.files[0]) {
                toastr.error('Upload picture is not selected');
                return;
            }
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
