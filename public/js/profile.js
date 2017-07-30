/* globals $ toastr requester */

$(() => {
    $('#profile-picture').on('change', () => {
        $('#profile-picture-form').submit();
    });
});

$(() => {
    const $button = $('#buttonEditProfile');
    const $save = $('#saveButton');

    $button.on('click', (event) => {
        event.preventDefault();

        $('.edittable').each((_, element) => {
            $(element).replaceWith(
                $('<input>')
                .val(`${$(element).text()}`)
                .addClass('eddited')
                .addClass('form-control')
                .css('background-color', '73ff00')
                .animate({
                    backgroundColor: 'white',
                }, 800));
        });

        $('#user-info')
            .find('.eddited')
            .first()
            .focus();

        $button.addClass('hidden');
        $save.removeClass('hidden');
    });

    $save.on('click', (event) => {
        event.preventDefault();

        const newUserInfo = {};
        $('#user-info').children().each((_, element) => {
            const $element = $(element);
            const $userData = $element.find('.user-data');
            const $userInfo = $element.find('.eddited');

            if (!$userData.length) {
                return;
            }

            newUserInfo[$userData.attr('data-name')] = $userInfo.val().trim();
        });

        requester.putJSON('/api/profile', newUserInfo)
            .then((message) => {
                $('#user-info').children().each((_, element) => {
                    const $userInfo = $(element).find('.eddited');
                    $userInfo.replaceWith(
                        $('<td>')
                        .text(`${$userInfo.val()}`)
                        .addClass('edittable'));
                });

                $save.addClass('hidden');
                $button.removeClass('hidden');

                toastr.success(message);
            })
            .catch((error) => {
                toastr.error(error.responseText);
            });
    });
});
