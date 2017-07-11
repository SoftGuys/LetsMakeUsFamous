window.onload = function () {

    let sound = document.getElementById('sound');

    sound.addEventListener('click', function () {
        let span = sound.childNodes[0];
        let currentClass = span.className;

        if (currentClass === "glyphicon glyphicon-volume-up") {
            currentClass = "glyphicon glyphicon-volume-off";
            span.className = currentClass;
            let myVideo = document.getElementById('myVideoHome');
            let src = myVideo.src;
            //Code is not working it simply reload page..
            myVideo.src += '&volume=0';
            console.log(myVideo)

        }

        else {
            currentClass = "glyphicon glyphicon-volume-up";
            span.className = currentClass;
        }
    })
}

