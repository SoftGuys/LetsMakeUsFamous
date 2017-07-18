function startTime() {
    const today = new Date();
    const h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('watch').innerHTML =
        h + ':' + m + ':' + s;
    const t = setTimeout(startTime, 500);
    console.log('x');
}
function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
startTime();
