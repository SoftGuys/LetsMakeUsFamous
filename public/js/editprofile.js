/* globals $ */
$(() => {
    const button = $('#buttonEditProfile');
    const editable = $('.edittable');
    const save = $('#saveButton');
    save.hide();
    button.show();

    button.on('click', () => {
        button.hide();
        save.show();

        for (const i of editable) {
            $(i).replaceWith($(`<input value="${$(i).text()}">`)
                .addClass('form-control').css('background-color', '73ff00'));
        }
    });

    save.on('click', () => {
        const formControl = $('.form-control');
        save.hide();
        button.show();
        for (const j of formControl) {
            $(j).replaceWith($(`<td>${$(j).val()}</td>`));
        }
    });
});
