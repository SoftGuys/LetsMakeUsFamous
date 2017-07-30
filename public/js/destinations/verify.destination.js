/* globals $ toastr*/

$(() => {
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

    const locationLoadPromise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((pos) => resolve(pos));
        })
        .then((position) => {
            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
        });

    $('#btn-send-verify-destination-picture').on('click', (ev) => {
        const fileInput = $('#btn-upload-destination-picture')[0];

        if (!fileInput.files || !fileInput.files[0]) {
            toastr.error('Upload picture is not selected');
            return;
        }

        const $form = $('#verify-destination-form');
        locationLoadPromise
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
