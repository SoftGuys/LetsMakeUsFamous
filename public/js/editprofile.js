/* globals $ toastr requester */

// must validate user input :)))

$(() => {
    const button = $('#buttonEditProfile');
    const save = $('#saveButton');

    save.hide();
    button.show();

    button.on('click', (event) => {
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

        button.hide();
        save.show();
    });

    save.on('click', (event) => {
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
            $userInfo.replaceWith(
                $('<td>')
                .text(`${$userInfo.val()}`)
                .addClass('edittable'));
        });

        save.hide();
        button.show();

        requester.putJSON('/api/profile', newUserInfo)
            .then((message) => {
                toastr.success(message);
            })
            .catch((error) => {
                toastr.error(error.responseText);
            });
    });
});
