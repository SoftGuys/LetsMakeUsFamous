/* globals $ */
$(() => {
    const button = $('#buttonEditProfile');
    const save = $('#saveButton');
    save.hide();
    button.show();

    button.on('click', (event) => {
        event.preventDefault();
        const editable = $('.edittable');

        button.hide();
        save.show();

        for (const i of editable) {
            $(i).replaceWith(
                $(`<input value="${$(i).text()}">`)
                .addClass('form-control')
                .css('background-color', '73ff00'));
        }
    });

    save.on('click', (event) => {
        event.preventDefault();
        const formControl = $('.form-control');

        save.hide();
        button.show();

        const newUserInfo = {};
        for (const j of formControl) {
            // collect property values here
            $(j).replaceWith(
                $(`<td>${$(j).val()}</td>`)
                .addClass('edittable'));
        }

        // do some ajax here
    });
});
