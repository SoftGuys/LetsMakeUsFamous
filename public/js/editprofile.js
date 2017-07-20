/* globals $ */
$('document').ready(() => {
    const button = $('#buttonEditProfile');
    const editable = $('.edittable');
    const save = $('#saveButton');
    save.hide();
    button.show();


    button.on('click', function() {
        button.hide();
        save.show();
        for (const i of editable) {
            console.log(i);
            // eslint-disable-next-line
            $(i).replaceWith($(`<input value="${$(i).text()}">`).addClass('form-control').css('background-color', '73ff00'));
        }
    });

        save.on('click', function() {
            const formControl = $('.form-control');
            save.hide();
            button.show();
            for (const j of formControl) {
                console.log(j);
                // eslint-disable-next-line
                $(j).replaceWith($(`<td>${$(j).val()}</td>`));
            }
        });
});
