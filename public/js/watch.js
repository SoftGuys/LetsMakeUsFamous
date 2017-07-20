/* globals $ */
$(() => {
    const startTime = () => {
        const today = new Date();
        const hours = today.getHours();
        const minutes = fixTimeUnit(today.getMinutes());
        const seconds = fixTimeUnit(today.getSeconds());

        document.getElementById('watch').innerHTML =
            hours + ':' + minutes + ':' + seconds;

        setTimeout(startTime, 500);
    };

    const fixTimeUnit = (timeUnit) => {
        if (timeUnit < 10) {
            timeUnit = '0' + timeUnit;
        }
        return timeUnit;
    };

    startTime();
});
