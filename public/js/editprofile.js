/* globals $ */
$('document').ready(() => {
    const button = $('#buttonEditProfile');
    const save = $('#saveButton');
    save.hide();
    button.show();


    button.on('click', function(event) {
        event.preventDefault();
        const editable = $('.edittable');
        button.hide();
        save.show();
        console.log('editvam');
        for (const i of editable) {
            console.log(i)
            // eslint-disable-next-line
            $(i).replaceWith($(`<input value="${$(i).text()}">`).addClass('form-control').css('background-color', '73ff00'));
        }
    });

    save.on('click', function(event) {
        event.preventDefault();
        const formControl = $('.form-control');
        save.hide();
        button.show();
        console.log(formControl);
        for (const j of formControl) {
            console.log(j);
            // eslint-disable-next-line
            $(j).replaceWith($(`<td>${$(j).val()}</td>`).addClass('edittable'));
        }
    });
});
